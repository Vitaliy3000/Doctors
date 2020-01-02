import { getDepartments, getDoctors, getSchedule } from '../proxyEmias'


export const loadDepartments = payload => {
	return function(dispatch) {
    dispatch(loadDepartmentsAction);
		return getDepartments(...payload)
						.then(response => dispatch(loadDepartmentsSuccess(response)))
            .catch(() => dispatch(loadDepartmentsFailureAction));
	};
};

export const loadDoctors = payload => {
	return function(dispatch) {
    dispatch(loadDoctorsAction);
    return getDoctors(...payload)
            .then(response => dispatch(loadDoctorsSuccess(response)))
            .catch(() => dispatch(loadDoctorsFailureAction));
	};
};


export const loadSchedule = payload => {
	return function(dispatch) {
    dispatch(loadScheduleAction);
    return getSchedule(...payload)
            .then(response => dispatch(loadScheduleSuccess(response)))
            .catch(() => dispatch(loadScheduleFailureAction));
	};
};


export const initStateAction = {
  type: 'INIT_EMIAS',
	payload: null,
}


export const loadDepartmentsAction = {
	type: 'LOAD_DEPARTMENTS',
	payload: null,
};


export const loadDepartmentsFailureAction = {
	type: 'LOAD_DEPARTMENTS_FAILURE',
	payload: 'Авторизация завершилась с ошибкой',
};


export const loadDepartmentsSuccess = payload => {
  return ({
	type: 'LOAD_DEPARTMENTS_SUCCESS',
	payload: payload,
});}


export const loadDoctorsAction = {
	type: 'LOAD_DOCTORS',
	payload: null,
};


export const loadDoctorsFailureAction = {
	type: 'LOAD_DOCTORS_FAILURE',
	payload: 'Авторизация завершилась с ошибкой',
};


export const loadDoctorsSuccess = payload => {
  return ({
	type: 'LOAD_DOCTORS_SUCCESS',
	payload: payload,
});}


export const loadScheduleAction = {
	type: 'LOAD_SCHEDULE',
	payload: null,
};


export const loadScheduleFailureAction = {
	type: 'LOAD_SCHEDULE_FAILURE',
	payload: 'Авторизация завершилась с ошибкой',
};


export const loadScheduleSuccess = payload => {
  return ({
	type: 'LOAD_SCHEDULE_SUCCESS',
	payload: payload,
});}

