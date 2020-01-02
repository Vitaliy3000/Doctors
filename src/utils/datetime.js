export function formatBirthDate(date) {
	const [day, month, year] = date.split('/');
	return `${year}-${month}-${day}`
}

export function days2weeks(days) {
  const weeks = [];

  for (let i = 0; i < days.length / 7; i++) {
    weeks[i] = []
    for (let j = 0; j <  7; j++) {
      weeks[i].push(days[i*7+j])
    }
  }

  return weeks
}


export function info2time(info) {
	const array = info.split(', ').flatMap(period => period.split('-'))
	const min = array.reduce((min, elem) => (parseInt(min.replace(':', '')) > parseInt(elem.replace(':', '')) ? elem : min), '23:59')
	const max = array.reduce((min, elem) => (parseInt(min.replace(':', '')) < parseInt(elem.replace(':', '')) ? elem : min), '00:00')
	return [min, max];
}