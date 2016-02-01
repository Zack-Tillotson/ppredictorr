import React from 'react';
import InlineCss from "react-inline-css";

import styles from './styles';

const Preferences = React.createClass({

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <h2>Challenge</h2>
        {this.props.route.type}
      </InlineCss>
    );
  }
});

export default Preferences;