import firebase from '../../firebase';

// Action types
const requestStarting = 'requestStarting';
const requestEnding = 'requestEnding';

// Basic creators

const creators = {
	requestStarting() {
		return {type: requestStarting}
	},
	requestEnding() {
		return {type: requestEnding}
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
			}
		}
	}
}