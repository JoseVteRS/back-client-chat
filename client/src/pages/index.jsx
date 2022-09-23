import io from 'socket.io-client';

export default function Home() {
	const socket = io('http://localhost:3001/');

	console.log(socket);

	const onClick = () => {
		socket.emit('msgToServer', 'hola');
		socket.on('msgToClient', payload => console.log(payload));
	};

	return (
		<div className='container mx-auto bg-slate-900 '>
			<button onClick={onClick}>Enviar Hola {socket.id}</button>
		</div>
	);
}
