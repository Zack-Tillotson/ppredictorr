import React from 'react';

import {connect} from 'react-redux';
import selector from '../../firebase/selector';

import {Link} from 'react-router';

import InlineCss from "react-inline-css";
import styles from './styles';

const Challenges = React.createClass({

  render() {
  	const challenges = this.props.challenges || [];
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <h2>Challenges</h2>
        <Link className="newChallenge" to="/challenges/new/">New Challenge</Link>
        {challenges.map(challenge => (
        	<Link key={challenge.id} className="updateChallenge" to={`/challenges/${challenge.id}/update/`}>
        		{challenge.title}
        	</Link>
        ))}

      </InlineCss>
    );
  }
});

export default connect(selector)(Challenges);