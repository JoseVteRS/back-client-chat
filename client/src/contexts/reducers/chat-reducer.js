export const chatReducer = (state, action) => {
	switch (action.type) {
		case 'new-message':
			return {
				...state,
				messages: [...state.messages, action.payload]
			};

		default:
			return state;
	}
};
