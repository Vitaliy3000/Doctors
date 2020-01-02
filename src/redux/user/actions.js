export const saveUserData = payload => {
	return function(dispatch) {
		localStorage.setItem('omsNumber', payload[0])
		localStorage.setItem('birthDate', payload[1])
    dispatch(saveUserDataAction(payload));
	}
}


export const loadUserData = payload => {
	return function(dispatch) {
    dispatch(loadUserDataAction([localStorage.getItem('omsNumber'), localStorage.getItem('birthDate')]));
	}
}


export const deleteUserData = payload => {
	return function(dispatch) {
		localStorage.removeItem('omsNumber');
		localStorage.removeItem('birthDate');
    dispatch(deleteUserDataAction);
	}
}


export const saveUserDataAction = payload => ({
	type: 'USER_SAVE',
	payload: payload,
});


export const loadUserDataAction = payload => ({
	type: 'USER_LOAD',
	payload: payload,
});


export const deleteUserDataAction = {
	type: 'USER_DELETE',
	payload: undefined,
};