import React from 'react';
import MaskedInput from 'react-maskedinput';
import { connect } from 'react-redux';

import Button from '../Button/Button'

import styles from './EnterForm.module.css';

import { formatBirthDate } from '../../utils/datetime';

import { saveUserData } from '../../redux/user/actions';

const emptyState =  {
	omsNumber: '',
	birthDate: '',
	error: '',
};

const fieldIsEmpty = value => value === '' || value.includes('_');

class EnterForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = emptyState;
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	clearForm() {
		this.setState(emptyState);
	}

	hasEmptyFields = () =>
		['omsNumber', 'birthDate'].some(field =>
			fieldIsEmpty(this.state[field])
	);

	formIsValid() {
		return !this.hasEmptyFields();
	}

	setFormError() {
		if (!this.formIsValid()) {
			this.setState({ error: 'Необходимо заполнить все поля формы' });
		}
	}

	handleSubmit = event => {
		event.preventDefault();

		if (!this.formIsValid()) {
			this.setFormError();
			return;
		}

		this.props.saveUserData([this.state.omsNumber, formatBirthDate(this.state.birthDate)])

		this.clearForm();
	};

	handleInputChange = event => {
		this.setState({
			error: '',
			[event.target.name]: event.target.value,
		});
	};

	render() {
		return (
			<form action='' onSubmit={this.handleSubmit} className={styles.authorizationForm}>
				<h3>Записаться к врачу</h3>
				<div className={styles.fields}>
					<MaskedInput
						mask='1111111111111111'
						name='omsNumber'
						value={this.state.omsNumber}
						onChange={this.handleInputChange}
						placeholder='Номер полиса'
						className={styles.input}
					/>
          <MaskedInput
						mask='11/11/1111'
						name='birthDate'
						value={this.state.birthDate}
						onChange={this.handleInputChange}
						placeholder='Дата рождения'
						className={styles.input}
					/>
				</div>
				{this.state.error && (<div className={styles.errorWrapper}>{this.state.error}</div>)}
				<Button type='submit' onClick={this.handleSubmit} >Авторизоваться</Button>
			</form>
		);
	}
}


const mapStateToProps = () => {};

const mapDispatchToProps = dispatch => ({
	saveUserData: payload => dispatch(saveUserData(payload)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EnterForm);
