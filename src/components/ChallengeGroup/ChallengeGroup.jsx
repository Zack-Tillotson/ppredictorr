import React from 'react';

import {connect} from 'react-redux';
import selector from './selector';
import actions from '../../Application/state/actions';

import InlineCss from "react-inline-css";
import styles from './styles';

import ChallengeTitle from '../ChallengeTitle';
import ChallengeQuestions from '../ChallengeQuestions';

const ChallengeGroup = React.createClass({

  propTypes: {
    challenge: React.PropTypes.object.isRequired, // from selector
    group: React.PropTypes.object.isRequired,     // from selector
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <ChallengeTitle challenge={this.props.challenge} />
        <div className="groupStatus">
          <div>Group stats - # members, # questions</div>
          <div>List of members - sorted by score, questions answered, time entered. Badges for 1st, 2nd, 3rd, and last place.</div>
        </div>
        <ChallengeQuestions challenge={this.props.challenge} />
      </InlineCss>
    );
  }
});

export default connect(selector, actions)(ChallengeGroup);