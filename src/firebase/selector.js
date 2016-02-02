import {createSelector} from 'reselect';

const firebase = (state) => {
	return state.firebase;
}

const authProvider = (state) => {
	return state.firebase.authInfo && state.firebase.authInfo.provider || '';
}

export const challenges = createSelector(firebase, (firebase) => {
	const challenges = firebase.data && firebase.data.challenges || [];
	const map = [];
	Object.keys(challenges).forEach((key, index) => {
		map[index] = {...challenges[key], id: key};
	})
	return map;
});

export default createSelector(firebase, authProvider, challenges, (firebase, authProvider, challenges) => {
  return {
    ...firebase,
    authProvider,
    challenges
  };
});