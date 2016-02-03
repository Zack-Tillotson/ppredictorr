import React from 'react';

import InlineCss from "react-inline-css";
import styles from './styles';

const ChallengeCard = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    image: React.PropTypes.string,
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <div className="imageContainer">
          <img src={this.props.image} height="100" />
        </div>
        <div className="contentContainer">
          <h3>{this.props.title}</h3>
          <div className="extraSentence">{this.props.questions.length} Questions</div>
        </div>
      </InlineCss>
    );
  }
});

export default ChallengeCard;