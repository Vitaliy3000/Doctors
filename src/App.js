import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import NotFoundPage from './pages/NotFoundPage';
import ExitPage from './pages/ExitPage';
import HelpPage from './pages/HelpPage';
import AppointmentPage from './pages/AppointmentPage';
import DepartmentPage from './pages/DepartmentPage';
import DoctorPage from './pages/DoctorPage';
import SchedulePage from './pages/SchedulePage';
import EnterPage from './pages/EnterPage';

import Header from './components/Header/Header';

import styles from './App.module.css';

import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

import { initStateAction } from './redux/emias/actions';

import { loadUserData, deleteUserData } from './redux/user/actions'

localStorage.clear()

class App extends React.Component {
  componentDidMount() {
    this.props.loadUserData()
  }

  renderAuthorizationUser = () => ([
      <Route key={2} path='/appointment/department/:departmentId/doctor/:doctorId/schedule' component={SchedulePage} />,
      <Route key={3} path='/appointment/department/:departmentId/doctor' component={DoctorPage} />,
      <Route key={4} path='/appointment/department' component={DepartmentPage} />,
      <Route key={5} path='/appointments' component={AppointmentPage} />,
      // <Route key={5} path='/exit' component={ExitPage} />,
      <Route path='/help' component={HelpPage} />,
      <Redirect from='*' to='/appointment/department' />,
  ]);

  renderNotAuthorizationUser = () => ([
      <Route exact key={1} path='/enter' component={EnterPage} />,
      <Redirect from='*' to='/enter' />,
  ]);

  renderPage = () => (
    <Router>
      {this.props.authorizationFlag && <Header />}
      <div className={styles.main}>
        <Switch>
          {/* {this.props.authorizationFlag ? this.renderAuthorizationUser() : this.renderNotAuthorizationUser()} */}
          {this.props.authorizationFlag && this.renderAuthorizationUser()}
          {!this.props.authorizationFlag && this.renderNotAuthorizationUser()}
        </Switch>
      </div>
    </Router>
  );

  renderLoadPage = () =>  (
    <div className={styles.loadPage} ><Spinner animation='border' variant='primary' /></div>
  );

  renderFailurePage = () => (
    <Alert onClose={() => {this.props.deleteUserData(); this.props.closeBanner();}} variant='danger' dismissible>
      <Alert.Heading>Error</Alert.Heading>
      <p>{this.props.textError}</p>
    </Alert>
  )

  render() {
    console.log('props app', this.props)
    console.log('app authorizationFlag', this.props.authorizationFlag)
    return (
      <div className={styles.App}>
        {/* {this.props.stateLoadingFlag ?  */}
        {this.props.textError ? this.renderFailurePage() : this.renderPage()}
      </div>
    );
  }
}


const mapStateToProps = state => {
  console.log('state app', state)
  return (
    { 
      textError: state.emias.textError,
      departments: state.emias.departments,
      authorizationFlag: Boolean(state.user.omsNumber),
      stateLoadingFlag: !state.emias.departments && state.user.omsNumber,
    }
  )
};

const mapDispatchToProps = dispatch => ({
  closeBanner: payload => dispatch(initStateAction),
  loadUserData: payload => dispatch(loadUserData(payload)),
  deleteUserData: payload => dispatch(deleteUserData()),
});


export { App };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

