import firebase from '../../firebase';
import firebaseActions from '../../firebase/actions';
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

	const fActions = firebaseActions(dispatch);

	return {
		dispatch: {
			putChallenge(challenge) {
				dispatch(creators.requestStarting());
				return firebase.putChallenge(challenge)
					.then((result) => {
						dispatch(creators.requestEnding());
					});
			},

			// Create a new group
			putGroupChallenge(challengeId, userId) {
				dispatch(creators.requestStarting());
				return firebase.putGroup(challengeId, userId)
					.then((result) => {
						// then navigate to the page /groups/group id
						// then sync group id
						dispatch(creators.requestEnding());
						const groupId = result.key();
						this.navigateToGroupChallenge(groupId);
					});
			},

			// Open existing challenge if user already is in a challenge else start new
			navigateToGroupChallenge(groupId) {
				browserHistory.push(`/groups/${groupId}/`);
			},

			// Ensure we're listening to the group data. Also adds the group to the user's list of
			// groups if needed.
			syncGroup(groupId, userId) {
				
				firebase.putUserGroupAffiliation(userId, groupId);

				return fActions.firebase.syncData(`groups/${groupId}`);
			},
			
		}
	}
}