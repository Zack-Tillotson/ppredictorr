import React from 'react';
import InlineCss from "react-inline-css";
import styles from './styles.raw.less';

import {Link} from 'react-router';

export default React.createClass({

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <header>
          {this.props.preferencesOpen && (
            <Link to="/">
              <div className="prefLink">
                ⓧ
              </div>
            </Link>
          )}
          {!this.props.preferencesOpen && (
            <Link to="/preferences">
              <div className="prefLink">
                ☰
              </div>
            </Link>
          )}
          <Link to="/">
            <h1>
              <div className="imageContainer">
                <img src="http://a5.mzstatic.com/us/r30/Purple69/v4/e6/11/cf/e611cfa6-1bd8-51f9-389f-24865faf69f9/icon175x175.png" alt="Jumpstart" />
              </div>
            </h1>
          </Link>
        </header>
      </InlineCss>
    );
  }
});