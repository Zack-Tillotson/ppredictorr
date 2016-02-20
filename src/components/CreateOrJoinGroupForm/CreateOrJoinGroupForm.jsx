import React from 'react';
import InlineCss from "react-inline-css";

import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector';
import dispatcher from '../../Application/state/actions';

import moment from 'moment';

import LoginForm from '../LoginForm';

const CreateOrJoinGroupForm = React.createClass({

  createGroupHandler(event) {
    this.props.dispatch.putGroupChallenge(this.props.challengeId, this.props.firebase.userId);
  },

  openGroupHandler(group) {
    this.props.dispatch.navigateToGroupChallenge(group.groupId);
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <div className="title">
          Ready to guess?
        </div>
        {this.props.firebase.isLoggedIn && (
          <div>
            {this.props.groups.map(group => (
              <div key={group.groupId} className="actionBtn continue" onClick={this.openGroupHandler.bind(this, group)}>
                Continue from {moment(group.timestamp).format('MMM DD, YYYY')}
              </div>
            ))}
            {this.props.groups.length > 0 && (
              <div className="seperator">or</div>
            )}
            <div className="actionBtn create" onClick={this.createGroupHandler}>
              Start a new Group Challenge
            </div>
          </div>
        )}
        {!this.props.firebase.isLoggedIn && (
          <div>
            Please Log In
            <LoginForm />
          </div>
        )}
      </InlineCss>
    );
  }
});

export default connect(selector, dispatcher)(CreateOrJoinGroupForm);