import { dehydrate, QueryClient } from 'react-query';
import { profileEndpoint } from '../api/auth.api';
import {
	getAuthTokenFromCookie,
	removeAuthCookie
} from '../utils/auth-cookie.util';
import { isSSR } from '../utils/is-ssr.util';

const REDIRECT = {
	redirect: {
		destination: '/login',
		permanent: false
	}
};

/**
 * High order function for pages where REDIRECTS if the user ISN'T AUTHENTICATED
 *  - !authToken -> Redirect
 *  - !isSSR && authToken -> Props
 *  - authToken && isSSR -> Get profile and props
 *    - Error on get profile (so rare) -> Remove cookie and redirect
 *
 * @param {Function} nextFn Next function to execute
 */
export const withAuthGSSP = nextFn => async context => {
	const { req, res } = context;

	const authToken = getAuthTokenFromCookie(req);
	if (!authToken) return REDIRECT;

	if (!isSSR(context)) return { props: { authToken } };

	try {
		const queryClient = new QueryClient();

		await queryClient.fetchQuery(['profile', authToken], () =>
			profileEndpoint(authToken)
		);

		await nextFn(context, queryClient, authToken);

		return {
			props: {
				authToken,
				dehydratedState: dehydrate(queryClient)
			}
		};
	} catch (error) {
		removeAuthCookie(res);
		return REDIRECT;
	}
};
