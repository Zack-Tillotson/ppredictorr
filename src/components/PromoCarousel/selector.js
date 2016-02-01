import firebaseSelector from '../../firebase/selector';

function getDataItem(data, name) {
	if(data && data[name]) {
		return data[name];
	} else {
		return {};
	}
}

export default state => {
  return {promo: getDataItem(firebaseSelector(state).data, 'promo')};
}