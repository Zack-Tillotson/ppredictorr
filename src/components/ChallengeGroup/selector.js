import selectors from '../../Application/state/selector';
import firebase from '../../firebase/selector';

export default (state, props) => {
	const baseState = firebase(state);
	const groupChallenge = selectors.groupChallenge(state, props.params.groupId);
  return {...baseState, group: groupChallenge.group, challenge: groupChallenge.challenge};
}