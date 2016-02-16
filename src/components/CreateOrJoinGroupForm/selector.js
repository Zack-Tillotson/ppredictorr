import firebaseSelector from '../../firebase/selector';
import {challenge, challengeGroups} from '../../Application/state/selector';

export default (state, props) => {
	const firebase = firebaseSelector(state);
  return {
  	firebase, 
  	challenge: challenge(state, props.challengeId),
  	groups: challengeGroups(state, props.challengeId, '')
  };
}