import React from 'react';
import { connect } from 'react-redux';
import { loadCurrentSchedule } from '../redux/emias/actions'
import ScheduleTable from '../components/ScheduleTable/ScheduleTable';
import renderLoadPage from './LoadPage';
import styles from './DefaultPage.module.css';


class SchedulePage extends React.Component {
	componentDidMount() {
		this.props.loadCurrentSchedule([this.props.omsNumber, this.props.birthDate, this.props.match.params.doctorId])
	}

	renderPage() {
		const doctor = this.props.doctors.filter(doctor => doctor.id === Number.parseInt(this.props.match.params.doctorId))[0];
		const doctor_schedule = this.props.schedule.filter(row => doctor.id === Number.parseInt(row.id))[0];
		return (
			<div className={styles.page}>
				<ScheduleTable
					schedule={doctor_schedule}
					doctor={doctor}
				/>
			</div>
		);
	}

	render() {
		console.log('schedule page', this.props.schedule, this.props.currentSchedule)
		return this.props.loadingFlag ? renderLoadPage() : this.renderPage()
	}
}


const mapStateToProps = state => (
  {
		doctors: state.emias.doctors,
		schedule: state.emias.schedule,
    loadingFlag: !state.emias.schedule || !state.emias.currentSchedule,
    omsNumber: state.user.omsNumber,
    birthDate: state.user.birthDate,
  	currentSchedule: state.emias.currentSchedule,
  }
);


const mapDispatchToProps = dispatch => ({
  loadCurrentSchedule: payload => dispatch(loadCurrentSchedule(payload)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage);
