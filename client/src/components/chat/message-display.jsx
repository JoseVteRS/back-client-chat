import clsx from 'clsx';
import React from 'react';

const MESSAGE = {
	owner: {
		position: 'justify-end',
		kind: 'bg-indigo-900'
	},
	reader: {
		position: 'justify-start',
		kind: 'bg-slate-500'
	}
};

const MessageDisplay = ({ user, message }) => {
	return (
		<div className={clsx(MESSAGE[user]['position'], 'w-full flex')}>
			<div
				className={clsx(
					MESSAGE[user]['kind'],
					'max-w-sm p-2 rounded mb-1'
				)}
			>
				{message}
			</div>
		</div>
	);
};

export default MessageDisplay;
