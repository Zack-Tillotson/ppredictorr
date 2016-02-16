import React from 'react';

import InlineCss from "react-inline-css";
import styles from './styles';

const AnswerCard = React.createClass({

  propTypes: {
    image: React.PropTypes.string,
    text: React.PropTypes.string,
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <div className="imageContainer">
          <img className="answerImage" src={this.props.image} />
        </div>
        <div className="contentContainer">
          <div className="answerText">
            {this.props.text}
          </div>
        </div>
      </InlineCss>
    );
  }
});

export default AnswerCard;