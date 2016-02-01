import firebaseSelector from '../../firebase/selector';

function getDefaultData() {
	return {
		promos: []
	};
}

export default state => {
  const data = firebaseSelector(state)
  return {...getDefaultData(), ...data};
}