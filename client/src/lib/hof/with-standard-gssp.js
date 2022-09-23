import { dehydrate, QueryClient } from 'react-query';
import { profileEndpoint } from '../api/auth.api';
import {
	getAuthTokenFromHeader,
	removeAuthCookie
} from '../utils/auth-cookie.utils';
import { isSSR } from '../utils/is-ssr.utils';

/**
 * High order function for pages where AUTHENTICATION IS OPTIONAL
 *  - !authToken && !isSSR-> Props
 *  - !authToken && isSSR -> Props and nextFn
 *  - authToken && !isSSR  -> Props
 *  - authToken && isSSR -> Get profile, nextFn and props
 *    - Error on get profile (so rare) -> Remove cookie and props
 *
 * @param {Function} nextFn Next function to execute
 */
export const withStandardGSSP = nextFn => async context => {
	const { req, res } = context;

	const authToken = getAuthTokenFromHeader(req);

	if (!isSSR(context)) return { props: { authToken } };

	const queryClient = new QueryClient();

	if (!authToken) {
		await nextFn(context, queryClient);

		return {
			props: {
				authToken: null,
				dehydratedState: dehydrate(queryClient)
			}
		};
	}

	try {
		await queryClient.fetchQuery(['profile', authToken], () =>
			profileEndpoint(authToken)
		);

		await nextFn(context, queryClient, authToken);

		console.log({ authToken });

		return {
			props: {
				authToken,
				dehydratedState: dehydrate(queryClient)
			}
		};
	} catch (error) {
		removeAuthCookie(res);

		return {
			props: { authToken: null }
		};
	}
};
