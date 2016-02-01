import React from 'react';

import InlineCss from "react-inline-css";
import styles from './styles';

const PromoCard = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    title: React.PropTypes.image,
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <div className="imageContainer">
          <img src={this.props.image} />
        </div>
        <div className="contentContainer">
          <h3>{this.props.title}</h3>
          <div className="extraSentence">{this.props.sentence}</div>
        </div>
      </InlineCss>
    );
  }
});

export default PromoCard;