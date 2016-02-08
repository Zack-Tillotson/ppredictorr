import {challenges} from '../../firebase/selector';

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