import {challenges, groups, users} from '../../firebase/selector';

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
	return challenges(state)
		.find(challenge => challenge.id == challengeId)
		|| getEmptyChallenge();
}

export const group = (state, groupId) => {
	return groups(state)
		.find(group => group.id == groupId);
}

export const groupChallenge = (state, groupId) => {
	const groupVal = group(state, groupId) || {};
	return {group: groupVal, challenge: challenge(state, groupVal.challengeId)};
}

export default {group, challenge, groupChallenge};