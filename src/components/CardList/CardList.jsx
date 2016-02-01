import React from 'react';

import InlineCss from "react-inline-css";
import styles from './styles';

const CardList = React.createClass({

  propTypes: {
    title: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    cards: React.PropTypes.array,
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <div className="title">{this.props.title}</div>
        <div className="cards">{this.props.cards}</div>
      </InlineCss>
    );
  }
});

export default CardList;