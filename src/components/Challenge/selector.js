import {challenge as challengeSelector, getEmptyChallenge, getEmptyQuestion, getEmptyAnswer} from '../../Application/state/selector';

export default (state, props) => {
	const challenge = challengeSelector(state, props.params && props.params.id || 0);
  return {challenge, getEmptyChallenge, getEmptyQuestion, getEmptyAnswer};
}