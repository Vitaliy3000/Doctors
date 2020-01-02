export default (state=[], action) => {
	console.log('emias reducer', state, action.type, action.payload)
	switch (action.type) {
		case 'INIT_EMIAS':
      return {departments: undefined, doctors: undefined, schedule: undefined};

		case 'LOAD_DEPARTMENTS':
			return {departments: undefined};

		case 'LOAD_DEPARTMENTS_FAILURE':
			return {departments: [], textError: action.payload};

		case 'LOAD_DEPARTMENTS_SUCCESS':
			return {departments: action.payload};

		case 'LOAD_DOCTORS':
			return {departments: state.departments, doctors: null};

		case 'LOAD_DOCTORS_FAILURE':
			return {departments: state.departments, doctors: [], textError: action.payload};

		case 'LOAD_DOCTORS_SUCCESS':
			return {departments: state.departments, doctors: action.payload.filter(doctor => doctor.complexResource.length)};

		case 'LOAD_SCHEDULE':
			return {departments: state.departments, doctors: state.doctors};

		case 'LOAD_SCHEDULE_FAILURE':
			return {departments: state.departments, doctors: state.doctors, schedule: [], textError: action.payload};

		case 'LOAD_SCHEDULE_SUCCESS':
			return {departments: state.departments, doctors: state.doctors, schedule: action.payload['availableResource']};

		default:
      return state;
	}
};
