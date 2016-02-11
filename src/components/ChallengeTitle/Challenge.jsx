import React from 'react';

import InlineCss from "react-inline-css";
import styles from './styles';

const ChallengeTitle = React.createClass({

  propTypes: {
    challenge: React.PropTypes.object.isRequired // from selector
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <h1 key="title" className="titleItem">{this.props.challenge.title}</h1>
        <div className="promoImage" style={{backgroundImage: `url('${this.props.challenge.image}')`}} />
      </InlineCss>
    );
  }
});

export default ChallengeTitle;