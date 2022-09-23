import Head from 'next/head';
import { Hydrate, QueryClientProvider } from 'react-query';
import Header from '../components/navigation/header';
import { AuthContext } from '../contexts/auth-context';
import { SocketProvider } from '../contexts/socket-context';
import { useAuth } from '../hooks/use-auth';
import { useQueryClient } from '../hooks/use-query-client';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
	const { authToken, dehydratedState, ...componentProps } = pageProps;

	const { authTokenRef, updateAuthToken } = useAuth(authToken);
	const queryClient = useQueryClient(authToken, authTokenRef);

	return (
		<QueryClientProvider client={queryClient.current}>
			<AuthContext.Provider
				value={{ authToken: authTokenRef.current, updateAuthToken }}
			>
				<SocketProvider>
					<Hydrate state={dehydratedState}>
						<Head>
							<title>Chat | Project practice purpose</title>
						</Head>
						<Header />
						<Component {...pageProps} />
						<footer></footer>
					</Hydrate>
				</SocketProvider>
			</AuthContext.Provider>
		</QueryClientProvider>
	);
}

export default MyApp;
