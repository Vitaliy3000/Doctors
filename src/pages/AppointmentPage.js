import React from 'react';
import { connect } from 'react-redux';

import Tile from '../components/Tile/Tile'

import styles from './AppointmentPage.module.css'

import Spinner from 'react-bootstrap/Spinner'

import { loadAppointment, deleteAppointment } from '../redux/appointment/actions';

class AppointmentPage extends React.Component{
	constructor(props) {
		super(props);
		this.handleAppointment = this.handleAppointment.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleDeleteAllAppointment = this.handleDeleteAllAppointment.bind(this);
	}

	handleAppointment() {
		this.props.loadAppointment([this.props.omsNumber, this.props.birthDate]);
	}

	handleDelete(id) {
		this.props.deleteAppointment([[id], this.props.omsNumber, this.props.birthDate]);
	}

	handleDeleteAllAppointment(indexDoctor) {
		this.props.deleteAppointment([
			this.props.appointments[indexDoctor].map(x=>x.appointmentId),
			this.props.omsNumber,
			this.props.birthDate,
		]);
	}

	//this.state.departments.filter(department => department.available_resource_id === doctor).map(department =>

	componentDidMount() {
		this.handleAppointment();
	}

	renderLoadPage() {
		return <div className={styles.loadPage} ><Spinner animation='border' variant='primary' /></div>;
	}

	renderEmptyPage() {
		return <h2>{'У вас пока нет записей!'}</h2>;
	}

	renderAppointmentsPage() {
		return (
			<div className={styles.page}>
			<ul className={styles.list}>
				{this.props.appointments
					.map((doctor, index) => 
						<Tile
							key={index}
							handleDelete={() => this.handleDeleteAllAppointment(index)}
							handleDeleteItem={this.handleDelete}
							appointments={doctor}
						/>)
				}
				</ul>
			</div>
		);
	}

	render() {
		console.log('props appointments', this.props)
		if (this.props.loadingFlag) {
			return this.renderLoadPage();
		} else {
			return  this.props.appointments.length === 0 ? this.renderEmptyPage() : this.renderAppointmentsPage();
		}
	}
}


const mapStateToProps = state => {console.log('appointment state', state); return {
	appointments: state.appointment.appointments && [...new Set(state.appointment.appointments.map(x=>x.doctor.id))].map(x => state.appointment.appointments.filter(y=>y.doctor.id===x)),
	loadingFlag: !state.appointment.appointments,
	omsNumber: state.user.omsNumber,
	birthDate: state.user.birthDate,
}};


const mapDispatchToProps = dispatch => ({
	loadAppointment: payload => dispatch(loadAppointment(payload)),
	deleteAppointment: payload => dispatch(deleteAppointment(payload)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppointmentPage);
