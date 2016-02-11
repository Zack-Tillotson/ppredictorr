import React from 'react';
import {connect} from 'react-redux';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Page from '../components/Page';
import Homepage from '../components/Homepage';
import Preferences from '../components/Preferences';
import Challenges from '../components/Challenges';
import Challenge from '../components/Challenge';
import ChallengeGroup from '../components/ChallengeGroup';

import firebase from '../firebase';
import actions from '../firebase/actions';

const selector = (state) => {
  return {};
}

const Application = React.createClass({

  componentDidMount() {
    this.props.firebase.monitorConnection();
    this.props.firebase.syncData('/');
  },

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Page}>
          <IndexRoute component={Homepage} />
          <Route path="preferences" component={Preferences} />
          <Route path="challenges">
            <IndexRoute component={Challenges} />
            <Route path="new" component={Challenge} type="create" />
            <Route path=":id">
              <IndexRoute component={Challenge} type="view" />
              <Route path="update" component={Challenge} type="update" />
            </Route>
          </Route>
          <Route path="groups">
            <Route path=":groupId" component={ChallengeGroup} />
          </Route>
        </Route>
      </Router>
    );
  }
});

export default connect(selector, actions)(Application);