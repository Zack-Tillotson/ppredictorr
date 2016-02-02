import {challenges} from '../../firebase/selector';

export default state => {
  return {challenges: challenges(state)};
}