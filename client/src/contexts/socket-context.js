import { createContext, useContext, useEffect } from 'react';
import { useSocket } from '../hooks/sockets/use-socket';
import { AuthContext } from './auth-context';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const { socket, online, connectSocket, disconnectSocket } = useSocket(
		'http://localhost:5000'
	);

	const { authToken } = useContext(AuthContext);

	useEffect(() => {
		if (authToken) {
			connectSocket();
		}
	}, [authToken]);

	useEffect(() => {
		if (!authToken) disconnectSocket();
	}, [authToken, disconnectSocket]);

	return (
		<SocketContext.Provider value={{ socket, online }}>
			{children}
		</SocketContext.Provider>
	);
};
