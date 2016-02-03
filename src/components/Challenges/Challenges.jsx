import React from 'react';

import {connect} from 'react-redux';
import selector from '../../firebase/selector';

import {Link} from 'react-router';

import InlineCss from "react-inline-css";
import styles from './styles';

import ChallengeCard from '../ChallengeCard';

const Challenges = React.createClass({

  render() {
  	const challenges = this.props.challenges || [];
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <h2>Challenges</h2>
        <div className="newChallenge">
          <Link to="/challenges/new/">New Challenge</Link>
        </div>
        <div className="challengeList">
          {challenges.map(challenge => (
          	<Link key={challenge.id} className="updateChallenge" to={`/challenges/${challenge.id}/`}>
          		<ChallengeCard {...challenge} />
          	</Link>
          ))}
        </div>
      </InlineCss>
    );
  }
});

export default connect(selector)(Challenges);