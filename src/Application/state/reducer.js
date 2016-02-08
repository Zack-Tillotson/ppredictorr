import {combineReducers} from 'redux';
import firebase from '../../firebase/reducer';

import {actionTypes} from './actions';

function getDefaultUIState() {
	return {
		loading: false
	};
}

const ui = (state = getDefaultUIState(), action) => {
	if(action.type == actionTypes.requestStarting) {
		return {...state, loading: true};
	} else if(action.type == actionTypes.requestEnding) {
		return {...state, loading: false};
	}
	return state;
}

export default combineReducers({ui, firebase});