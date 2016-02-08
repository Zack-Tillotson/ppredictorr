import firebaseSelector from '../../firebase/selector';
import {challenge} from '../../Application/state/selector';

export default (state, props) => {
  return {firebase: firebaseSelector(state), challenge: challenge(state, props.challengeId)};
}