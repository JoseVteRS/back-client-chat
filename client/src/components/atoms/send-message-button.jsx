import clsx from 'clsx';
import SendIcon from '../icons/send-icon';

const SendMessageButton = ({ ...props }) => {
	return (
		<button
			className={clsx(
				'absolute right-0 text-white bg-indigo-500 w-10 h-full rounded-r'
			)}
			{...props}
		>
			<SendIcon className='fill-white h-6 w-6 mx-auto' />
		</button>
	);
};

export default SendMessageButton;
