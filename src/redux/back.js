function request(url, method, body) {
  const full_url = 'https://back-q-doctor.herokuapp.com'+url
  const params = {
    method: method,
    headers: {'Content-Type': 'application/json'},
  };

  if (body) {
    params.body = JSON.stringify(body);
  }

  return fetch(full_url, params);
}


const fetchCreateAppointment = (omsNumber, birthDate, params) => request(`/people/appointments`, 'POST', Object.assign({}, {appointment: params, person: {omsNumber, birthDate}}))
const fetchLoadAppointments = (omsNumber, birthDate) => request(`/people/appointments?omsNumber=${omsNumber}&birthDate=${birthDate}`, 'GET')
const fetchDeleteAppointment = (appointmentId, omsNumber, birthDate) => request(`/people/appointments/${appointmentId}?omsNumber=${omsNumber}&birthDate=${birthDate}`, 'DELETE')
const registrationUser = (omsNumber, birthDate) => request('/people', 'POST', {oms_number: omsNumber, birth_date: birthDate});

export { fetchCreateAppointment, fetchLoadAppointments, fetchDeleteAppointment, registrationUser };


		// const start = new Date(Date.parse(date));
		// const end = new Date(new Date(start).setDate(start.getDate()+1))
		// return {
		// 	'appointment': {
		// 		'available_resource_id': String(availableResourceId),
		// 		'complex_resource_id': String(complexResourceId),
		// 		'start_time': start.toISOString().split('.')[0],
		// 		'finish_time': end.toISOString().split('.')[0],
		// 		'lpu_id': String(lpuId),
		// 		'priority': 0,
		// 		'reception_type_code_or_ldp_type_code': code,
		// 	},
		// 	'person': {
		// 		'birth_date': birthDate,
		// 		'oms_number': omsNumber,
		// 	}