import firebase from '../../firebase';
import { browserHistory } from 'react-router';

// Action types
export const actionTypes = {
	requestStarting: 'requestStarting',
	requestEnding: 'requestEnding',
}

// Basic creators

const creators = {
	requestStarting() {
		return {type: actionTypes.requestStarting}
	},
	requestEnding() {
		return {type: actionTypes.requestEnding}
	}
}

// Dispatcher for use in componenets

export default (dispatch, props) => {
	return {
		dispatch: {
			putChallenge(challenge) {
				dispatch(creators.requestStarting());
				return firebase.putChallenge(challenge)
					.then((result) => {
						dispatch(creators.requestEnding());
					});
			},

			// Create an existing challenge
			putGroupChallenge(challenge, userId) {
				dispatch(creators.requestStarting());
				return firebase.putGroup(challenge, userId)
					.then((result) => {
						// then navigate to the page /groups/group id
						// then sync group id
						dispatch(creators.requestEnding());
						const groupId = result.key();
						browserHistory.push(`/groups/${groupId}`);
					});
			},

			// Open existing challenge if user already is in a challenge else start new
			navigateToGroupChallenge(challenge) {
			},
		}
	}
}