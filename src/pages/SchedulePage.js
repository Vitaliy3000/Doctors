import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

import ScheduleTable from '../components/ScheduleTable/ScheduleTable'

import styles from './DefaultPage.module.css'


const renderLoadPage = () => (
	<div className={styles.loadPage} ><Spinner animation='border' variant='primary' /></div>
)

const renderPage = (schedule, doctors, doctorId) => {
	console.log('props schedule', schedule, doctors, doctorId)
	const doctor = doctors.filter(doctor => doctor.id === Number.parseInt(doctorId))[0];
	const doctor_schedule = schedule.filter(row => doctor.id === Number.parseInt(row.id))[0];
	return (
		<div className={styles.page}>
			<ScheduleTable
				schedule={doctor_schedule}
				doctor={doctor}
			/>
		</div>
	);
}


function render( {schedule, doctors, match: {params: {doctorId}}} ) {
	return schedule ? renderPage(schedule, doctors, doctorId) : renderLoadPage();
}


const mapStateToProps = state => (
  {
		doctors: state.emias.doctors,
		schedule: state.emias.schedule,
    // loadingFlag: !state.emias.doctors,
    // omsNumber: state.user.omsNumber,
    // birthDate: state.user.birthDate,
    // lpuId: state.emias.doctors && state.emias.doctors.length !== 0 && state.emias.doctors[0].lpuId,
    // schedule: state.emias.schedule,
  }
);

// const mapStateToProps = state => ({schedule: state.schedule.schedule});


export default connect(mapStateToProps)(render);
