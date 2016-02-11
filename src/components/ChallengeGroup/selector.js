import selectors from '../../Application/state/selector';

export default (state, props) => {
	const groupChallenge = selectors.groupChallenge(state, props.params.groupId);
  return {group: groupChallenge.group, challenge: groupChallenge.challenge};
}