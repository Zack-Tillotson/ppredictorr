import React from 'react';

import InlineCss from "react-inline-css";
import styles from './styles';

import {connect} from 'react-redux';
import selector from './selector';

import CardList from '../CardList';
import PromoCard from '../PromoCard';

const PromoCarousel = React.createClass({

  propTypes: {
    data: React.PropTypes.object
  },

  render() {

    const {promo} = this.props;

    const cardsData = promo.cards || [];
    const cardListTitle = promo.title || '';

    const cards = cardsData.map((cardData, index) => {
      return (
        <PromoCard key={index} {...cardData} />
      );
    })

    return (
      <InlineCss stylesheet={styles} componentName="container">
        <CardList orientation="horizontal" title={cardListTitle} cards={cards} />
      </InlineCss>
    );
  }
});

export default connect(selector)(PromoCarousel);