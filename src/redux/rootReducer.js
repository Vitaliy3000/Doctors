import { combineReducers } from 'redux';

import appointment from './appointment/reducer';
import emias from './emias/reducer';
import user from './user/reducer';

export default combineReducers({
	appointment,
	emias,
	user,
});
