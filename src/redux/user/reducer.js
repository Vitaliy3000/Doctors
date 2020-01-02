export default (state=[], action) => {
	console.log('reducer user', action)
	switch (action.type) {
		case 'USER_SAVE':
			return {omsNumber: action.payload[0], birthDate: action.payload[1]};

		case 'USER_LOAD':
			return {omsNumber: action.payload[0], birthDate: action.payload[1]};

		case 'USER_DELETE':
			return {};

		default:
			return state;
	}
};
