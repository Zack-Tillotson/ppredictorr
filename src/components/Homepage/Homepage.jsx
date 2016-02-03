import React from 'react';

import InlineCss from "react-inline-css";
import styles from './styles';

import {connect} from 'react-redux';
import selector from './selector';

import {Link} from 'react-router';

import PromoCarousel from '../PromoCarousel';
import Challenges from '../Challenges';

const Homepage = React.createClass({

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <PromoCarousel data={this.props.promo} />
        <Challenges challenges={this.props.challenges} />
      </InlineCss>
    );
  }
});

export default connect(selector)(Homepage);