import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const useSocket = serverPath => {
	const [socket, setSocket] = useState(null);
	const [online, setOnline] = useState(false);

	const connectSocket = useCallback(() => {
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI5NDQzZjUxLWM2YjYtNGJlYi04ZTkxLWIwNGJkNjI1MjRlYiIsImlhdCI6MTY2Mzk0NTI5MywiZXhwIjoxNjY0MDMxNjkzfQ.8GvVw7cL02uoySyhrDcSWvDHwllm8HJqpyleBGYGx9Y';

		console.log({ token });

		const socketTemp = io(serverPath, {
			transports: ['websocket'],
			autoConnect: true,
			forceNew: true,
			query: {
				Authorization: token
			}
		});
		setSocket(socketTemp);
	}, [serverPath]);

	const disconnectSocket = useCallback(() => {
		socket?.disconnect();
	}, [socket]);

	useEffect(() => {
		setOnline(socket?.connected);
	}, [socket]);

	useEffect(() => {
		socket?.on('connect', () => setOnline(true));
	}, [socket]);

	useEffect(() => {
		socket?.on('disconnect', () => setOnline(false));
	}, [socket]);

	return {
		socket,
		online,
		connectSocket,
		disconnectSocket
	};
};
