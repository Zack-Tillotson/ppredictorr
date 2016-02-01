import Firebase from 'firebase';

const firebaseUrlBase = 'https://ppredictorr.firebaseio.com';

function getFirebaseUrl(path) {
  return [firebaseUrlBase, path]
    .filter(section => !!section)
    .join('/');
}

function connect(path) {
  const firebaseUrl = getFirebaseUrl(path);
  return new Firebase(firebaseUrl);
}

function getDataArray(data, path) {
	const dataObj = typeof data === 'object' ? data : {};
	const pathObj= dataObj[path] || [];
	return pathObj instanceof Array ? pathObj : (["time to impl this!"]);
}

export default {connect, getDataArray};