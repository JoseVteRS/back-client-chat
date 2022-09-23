import { createContext, useReducer } from 'react';
import { chatReducer } from './reducers/chat-reducer';

export const ChatContext = createContext();

const initialState = {
	id: '',
	messages: []
};

export const ChatProvider = ({ children }) => {
	const [chatState, chatDispatch] = useReducer(chatReducer, initialState);

	return (
		<ChatContext.Provider
			value={{
				chatState,
				chatDispatch
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};
