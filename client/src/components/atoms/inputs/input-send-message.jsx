import { forwardRef } from 'react';
import SendMessageButton from '../send-message-button';

const InputSendMessage = ({ ...props }, ref) => {
	return (
		<div className='bg-slate-900 w-full p-3 fixed bottom-0'>
			<div className='relative'>
				<input
					className=' text-slate-300 rounded w-full p-2 pr-16 focus'
					{...props}
					ref={ref}
					placeholder='Escribe el mensaje'
					type='text'
				/>
				<SendMessageButton />
			</div>
		</div>
	);
};

export default forwardRef(InputSendMessage);
