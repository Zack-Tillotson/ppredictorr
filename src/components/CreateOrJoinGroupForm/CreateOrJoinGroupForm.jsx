import React from 'react';
import InlineCss from "react-inline-css";

import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector';
import dispatcher from '../../Application/state/actions';

import LoginForm from '../LoginForm';

const CreateOrJoinGroupForm = React.createClass({

  createGroupHandler(event) {
    this.props.dispatch.putGroupChallenge(this.props.challengeId, this.props.firebase.authInfo.uid);
  },

  openGroupHandler(event) {
    this.props.dispatch.navigateToGroupChallenge(this.props.challengeId);
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <div className="title">
          Ready to guess?
        </div>
        {this.props.firebase.isLoggedIn && (
          <div>
            <div className="actionBtn create" onClick={this.createGroupHandler}>
              Start a group challenge
            </div>
            {(this.props.groups || []).map(group => (
              <div className="actionBtn continue" onClick={this.openGroupHandler}>
                Continue a challenge
              </div>
            ))}
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