function request(body) {
  return fetch(
    'https://proxy-q-doctor.herokuapp.com/',
    {
      method: 'POST',
      body: JSON.stringify(body),
      // headers: {'Content-Type': 'application/json'},
    },
  )
    .then(response => response.json())
    .then(response => response['result'])
    .then(response => {
      if (!response) {
        throw 'Ошибка EMIAS';
      } else {
        return response;
      }
    });
}


export const getDepartments = (omsNumber, birthDate) => request({
  url: 'https://emias.info/api/new/eip2/?getSpecialitiesInfo',
  jsonrpc: "2.0",
  id: "",
  method: "getSpecialitiesInfo",
  params: {omsNumber, birthDate},
});


export const getDoctors = (omsNumber, birthDate, specialityId) => request({
  url: 'https://emias.info/api/new/eip2/?getDoctorsInfo',
  jsonrpc: "2.0",
  id: "",
  method: "getDoctorsInfo",
  params: {omsNumber, birthDate, specialityId},
});


export const getSchedule = (lpuId) => request({
  url: 'https://api.emias.info/jsonproxy/v1/',
  jsonrpc: "2.0",
  id: "",
  method: "get_lpu_schedule_info",
  params: {lpuId},
})


export const getCurrentSchedule = (omsNumber, birthDate, availableResourceId) => request({
  url: 'https://emias.info/api/new/eip2/?getAvailableResourceScheduleInfo',
  jsonrpc: "2.0",
  id: "",
  method: "getAvailableResourceScheduleInfo",
  params: {omsNumber, birthDate, availableResourceId},
})