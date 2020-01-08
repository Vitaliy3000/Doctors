import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ScheduleCell from '../ScheduleCell/ScheduleCell';

import Button from 'react-bootstrap/Button'

import styles from './ScheduleTable.module.css';

import { createAppointment } from '../../redux/appointment/actions';

import { days2weeks, info2time } from '../../utils/datetime'



class ScheduleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClick(element) {
    const [start, end] = info2time(element.receptionInfo)
    this.setState({[element.date]: {
      state: !this.state[element.date],
      startTime: element.date+'T'+start+':00',
      endTime: element.date+'T'+end+':00',
    }});
  }

  handleSubmit() {
    console.log('schedule tabl state', this.state);
    Object.keys(this.state)
      .filter(x => this.state[x].state)
      .map(x => this.props.createAppointment([
        this.props.omsNumber,
        this.props.birthDate,
        {
          startTime: this.state[x].startTime,
          endTime: this.state[x].endTime,
          doctor: this.props.doctor,
        },
      ]));
    // this.setState(Object.keys(this.state).reduce((obj, x) => {console.log(obj, x); obj[x] = {state: false}; return obj;}, {}))
  }

  renderHead() {
    return (
      <thead>
        <tr>
          <th>Понедельник</th>
          <th>Вторник</th>
          <th>Среда</th>
          <th>Четверг</th>
          <th>Пятница</th>
          <th>Суббота</th>
          <th>Воскресенье</th>
        </tr>
      </thead>);
  }

  renderBody() {
    const table = [];
    const weeks = days2weeks(this.props.schedule.schedule);
  
    for (const week of weeks){
      let row = [];
      for (const day of week) {
        // active={Boolean(this.state[day.date])}
        row.push(
          <td>
            <ScheduleCell
             handleClick={this.handleClick}
             active={Boolean(this.state[day.date])}
             cell={day}
             currentFlag={this.props.currentSchedule.includes(day.date)}/>
          </td>
        )
      }
      table.push(<tr>{row}</tr>)
    }

    return table;
  }

  render() {
    return (
      <div className={styles.schedule}>
        <table className={styles.table}>
          {this.renderHead()}
        <tbody>
          {this.renderBody()}
        </tbody>
      </table>
      <div className={styles.footer}>
        <NavLink to={'/appointments'}>
          <Button onClick={this.handleSubmit} variant='primary' size='lg' active>{'Встать в очередь'}</Button>
        </NavLink>
      </div>
    </div>
    );
  }

}


const mapStateToProps = state => {console.log('state schedule table', state); return(
  {
    omsNumber: state.user.omsNumber,
    birthDate: state.user.birthDate,
    currentSchedule: state.emias.currentSchedule,
  }
);}

const mapDispatchToProps = dispatch => ({
  createAppointment: payload => dispatch(createAppointment(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTable);