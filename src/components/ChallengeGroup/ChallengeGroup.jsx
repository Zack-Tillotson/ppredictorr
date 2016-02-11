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

  onComponentDidMount() {

    // This means we just routed to this directory. Set up the data controls.
    this.props.dispatch.initializeGroup(this.props.params.groupId);

  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <ChallengeTitle challenge={this.props.challenge} />
        <div className="groupStatus">Group Status</div>
        <ChallengeQuestions challenge={this.props.challenge} />
      </InlineCss>
    );
  }
});

export default connect(selector, actions)(ChallengeGroup);