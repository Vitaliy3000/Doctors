import React from 'react';

import styles from './ScheduleCell.module.css';

import { info2time } from '../../utils/datetime'

export default class ScheduleCell extends React.Component {
	constructor(props) {
		super(props)

		this.state = {active: this.props.active};
	}

	changeStyle() {
		this.setState({active: !this.state.active})
	}

	renderHolidayDay = () => (
		<div className={styles.colEmpty}>
			<div className={styles.date}>
				{this.props.cell['date']}
			</div>
			<div className={styles.time}>
				{this.props.cell['receptionInfo']}
			</div>
		</div>
	)

	renderWorkDay() { 
		const [start, end] = info2time(this.props.cell['receptionInfo'])
		return (
			<div
				className={this.props.currentFlag ? (this.state.active ? styles.colAciveNow : styles.colNow) : (this.state.active ? styles.colAcive : styles.col)}
				onClick={() => {this.props.handleClick(this.props.cell); this.changeStyle()}}>
				<div className={styles.date}>
					{this.props.cell['date']}
				</div>
				<div className={styles.time}>
					{`${start}-${end}`}
				</div>
			</div>
		);
	}

	renderDayOff = () => (
		<div className={styles.colNotAllowed}>
			<div className={styles.date}>
				{this.props.cell['date']}
			</div>
		</div>
	);

	render() {
		if (['Отпуск', 'Заболел'].includes(this.props.cell['receptionInfo'])) {
			return this.renderHolidayDay();
		} else if (this.props.cell['receptionInfo']) {
			return this.renderWorkDay();
		} else {
			return this.renderDayOff();
		}
	}
}