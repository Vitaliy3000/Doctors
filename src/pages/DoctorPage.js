import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

import LinkItem from '../components/LinkItem/LinkItem'

import styles from './DefaultPage.module.css'

import { loadDoctors, loadSchedule } from '../redux/emias/actions';

class DoctorPage extends React.Component {
  handleDoctor () {
    console.log('props doctor', this.props)
    this.props.loadDoctors([this.props.omsNumber, this.props.birthDate, this.props.match.params.departmentId])
  }

  handleSchedule() {
    this.props.loadSchedule([this.props.lpuId])
  }

  componentDidMount() {
    this.handleDoctor()
  }

  componentDidUpdate() {
    console.log('update doctor', this.props)
    if (this.props.lpuId && (!this.props.schedule || this.props.schedule.length === 0)) {
      console.log('update doctor');
      this.handleSchedule();
    }
  }

  renderPage() {
    return (
      <div className={styles.page}>
        <ul className={styles.list}>
          {this.props.doctors.map(doctor =>
            <NavLink key={doctor.id} to={`doctor/${doctor.id}/schedule`} >
              <LinkItem
                key={doctor.id}
                index={doctor.id}
                text={doctor.mainDoctor.lastName + ' ' + doctor.mainDoctor.firstName + ' ' + doctor.mainDoctor.secondName} />
            </NavLink>)
          }
        </ul>
      </div>
    );
  }

  renderEmptyPage() {
    return <h2>Расписание недоступно!</h2>
  }

  renderLoadPage = () =>  (
    <div className={styles.loadPage} ><Spinner animation='border' variant='primary' /></div>
  );

  render() {
    return (this.props.loadingFlag ? 
            this.renderLoadPage() :
            this.props.doctors.length ?
            this.renderPage() :
            this.renderEmptyPage())
  }
}


const mapStateToProps = state => {console.log('state doctor', state); return(
  {
    doctors: state.emias.doctors,
    loadingFlag: !state.emias.doctors,
    omsNumber: state.user.omsNumber,
    birthDate: state.user.birthDate,
    lpuId: state.emias.doctors && state.emias.doctors.length !== 0 && state.emias.doctors[0].lpuId,
    schedule: state.emias.schedule,
  }
);}

const mapDispatchToProps = dispatch => ({
  loadDoctors: payload => dispatch(loadDoctors(payload)),
  loadSchedule: payload => dispatch(loadSchedule(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorPage);
