import InputSendMessage from '../components/atoms/inputs/input-send-message';
import MessageDisplay from '../components/chat/message-display';
import { useProfile } from '../hooks/api/users';
import { authGSSP } from '../lib/gssp/auth-gssp';

import { useSocket } from '../hooks/sockets/use-socket';

const ChatPage = () => {
	const { data } = useProfile();

	console.log(data);

	const { socket, online } = useSocket('http://localhost:5000');

	console.log(socket, online);

	return (
		<div className='bg-slate-900 min-h-screen'>
			<h1 className='text-yellow-500 font-bold text-lg text-center pt-8'>
				WRT
			</h1>

			<div className=''>
				<div className='container mx-auto h-full rounded text-slate-400 p-3 messages'>
					<MessageDisplay user='owner' message='Hola' />
					<MessageDisplay user='reader' message='Hola' />
					<MessageDisplay
						user='reader'
						message='Hoy quedamos o que?'
					/>
					<MessageDisplay user='owner' message='Claro que si' />
					<MessageDisplay user='owner' message='Claro que si' />
				</div>
				<div className=''>
					<InputSendMessage />
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = authGSSP;

export default ChatPage;
