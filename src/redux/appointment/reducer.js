export default (state=undefined, action) => {
	switch (action.type) {
		case 'INIT_APPOINTMENT':
      return {appointments: undefined};

		case 'LOAD_APPOINTMENT':
			return {appointments: undefined};

		case 'LOAD_APPOINTMENT_SUCCESS':
			return {appointments: action.payload};

		case 'LOAD_APPOINTMENT_FAILURE':
				return {appointments: []};

		case 'DELETE_APPOINTMENT':
			return {appointments: state.appointments};

		case 'DELETE_APPOINTMENT_SUCCESS':
			return {appointments: state.appointments.filter(department => !action.payload.includes(department.appointmentId))};

		case 'DELETE_APPOINTMENT_FAILURE':
			return {appointments: state.appointments};

		default:
			return {appointments: state === undefined ? [] : state.appointments};
	}
};

