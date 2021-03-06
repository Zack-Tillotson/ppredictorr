import firebase from '../../firebase/selector';

function getEmptyAnswer() {
	return {
		text: '',
		image: '',
	}
}

function getEmptyQuestion() {
	return {
		question: '',
		image: '',
		answers: []
	}
}

function getEmptyChallenge() {
	return {
		title: '',
		image: '',
		questions: []
	}
}

export const challenge = (state, challengeId) => {
	return firebase(state).challenges
		.find(challenge => challenge.id == challengeId)
		|| getEmptyChallenge();
}

export const challengeGroups = (state, challengeId, userId) => {
	return [];// TODO
	const baseState = firebase(state);
	const thisUser = user(state);
	const groups = baseState.groups;
	if(thisUser.challenges && thisUser.challenges[challengeId]) {
		const challengeObject = thisUser.challenges[challengeId];
		return Object.keys(challengeObject)
			.map(key => challengeObject[key]);
	} else {
		return [];
	}
}

export const group = (state, groupId) => {
	const baseState = firebase(state);
	return baseState.groups
		.find(group => group.id == groupId);
}

export const groupChallenge = (state, groupId) => {
	const groupVal = group(state, groupId) || {};
	return {group: groupVal, challenge: challenge(state, groupVal.challengeId)};
}

export default {group, challenge, 	challengeGroups, groupChallenge};