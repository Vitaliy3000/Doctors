import { fetchCreateAppointment, fetchLoadAppointments, fetchDeleteAppointment } from '../back'


export const createAppointment = payload => {
	return function(dispatch) {
		dispatch(createAppointmentAction)
		return fetchCreateAppointment(...payload)
			.then(() => dispatch(createAppointmentSuccess))
			.catch(() => dispatch(createAppointmentFailure));
	};
};


export const loadAppointment = payload => {
	return function(dispatch) {
    dispatch(loadAppointmentAction);
		return fetchLoadAppointments(...payload)
			.then(response => response.json())
			.then(response => dispatch(loadAppointmentSuccess(response)))
			.catch(() => dispatch(loadAppointmentFailure));
	};
};


export const deleteAppointment = payload => {
	return function(dispatch) {
		dispatch(deleteAppointmentAction);
		return Promise.all(payload[0].map(id => fetchDeleteAppointment(id, payload[1], payload[2])))
						.then(() => dispatch(deleteAppointmentSuccess(payload[0])))
						.catch(() => dispatch(deleteAppointmentFailure));
	};
};


export const createAppointmentAction = {
	type: 'CREATE_APPOINTMENT',
	payload: null,
};


export const createAppointmentSuccess = ({
	type: 'CREATE_APPOINTMENT_SUCCESS',
	payload: null,
});


export const createAppointmentFailure = {
	type: 'CREATE_APPOINTMENT_FAILURE',
	payload: null,
};


export const loadAppointmentAction = {
	type: 'LOAD_APPOINTMENT',
	payload: null,
};


export const loadAppointmentSuccess = payload => ({
	type: 'LOAD_APPOINTMENT_SUCCESS',
	payload: payload,
});


export const loadAppointmentFailure = {
	type: 'LOAD_APPOINTMENT_FAILURE',
	payload: null,
};


export const deleteAppointmentAction = {
	type: 'DELETE_APPOINTMENT',
	payload: null,
};


export const deleteAppointmentSuccess = payload => ({
	type: 'DELETE_APPOINTMENT_SUCCESS',
	payload: payload,
});


export const deleteAppointmentFailure = {
	type: 'DELETE_APPOINTMENT_FAILURE',
	payload: null,
};