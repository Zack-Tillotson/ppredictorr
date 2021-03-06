import React from 'react';
import InlineCss from "react-inline-css";
import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector.js';

const FirebaseStatus = React.createClass({

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <table>
          <tbody>
            <tr>
              <td>Connection</td>
              <td>{this.props.connected ? 'Online' : 'Offline'}</td>
            </tr>
            <tr>
              <td>Lag</td>
              <td>{this.props.serverTimeOffset}</td>
            </tr>
            <tr>
              <td>Authentication</td>
              <td>{this.props.isLoggedIn ? 'Authenticated' : 'Unauthenticated'}</td>
            </tr>
            <tr>
              <td>Provider</td>
              <td>{this.props.authProvider}</td>
            </tr>
          </tbody>
        </table>
      </InlineCss>
    );
  }
});

export default connect(selector)(FirebaseStatus);