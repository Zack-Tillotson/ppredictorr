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

export default (state, props) => {
	const challenge = challenges(state)
		.find(challenge => challenge.id == props.params.id)
		|| getEmptyChallenge()
  return {challenge, getEmptyChallenge, getEmptyQuestion, getEmptyAnswer};
}