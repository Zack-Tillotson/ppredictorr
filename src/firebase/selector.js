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

export const groups = createSelector(firebase, (firebase) => {
	const groups = firebase.data && firebase.data.groups || [];
	const map = [];
	Object.keys(groups).forEach((key, index) => {
		map[index] = {...groups[key], id: key};
	});
	return map;
});

export default createSelector(firebase, authProvider, challenges, groups, (firebase, authProvider, challenges, groups) => {
  return {
    ...firebase,
    authProvider,
    challenges,
    groups
  };
});