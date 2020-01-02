import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

import LinkItem from '../components/LinkItem/LinkItem'

import styles from './DefaultPage.module.css'

import { loadDepartments } from '../redux/emias/actions';


class DepartmentPage extends React.Component {
  handleDepartment () {
    console.log('props Department', this.props)
    this.props.loadDepartments([this.props.omsNumber, this.props.birthDate])
  }

  componentDidMount() {
    if (!this.props.departments || this.props.departments.length === 0) {
      this.handleDepartment();
    }
  }

  renderPage() {
    console.log('cloud with Departments', this.props)
    return (
      <div className={styles.page}>
        <ul className={styles.list}>
					{this.props.departments.map(department => 
						<NavLink key={department.code} to={`department/${department.code}/doctor`} >
							<LinkItem
								key={department.code}
								index={department.code}
								text={department.name} />
						</NavLink>)}
        </ul>
      </div>
    );
  }

  renderLoadPage = () =>  (
    <div className={styles.loadPage} ><Spinner animation='border' variant='primary' /></div>
  );

  render() {
    return this.props.loadingFlag ? this.renderLoadPage() : this.renderPage();
  }
}


const mapStateToProps = state => {console.log('state doctor', state); return(
  {
    departments: state.emias.departments,
    loadingFlag: !state.emias.departments,
    omsNumber: state.user.omsNumber,
    birthDate: state.user.birthDate,
  }
);}


const mapDispatchToProps = dispatch => ({
  loadDepartments: payload => dispatch(loadDepartments(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentPage);