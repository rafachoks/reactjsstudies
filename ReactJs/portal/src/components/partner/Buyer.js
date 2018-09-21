import React, { Component } from 'react'
import BuyerAutoComplete from '../ReactFormAutoBuyer';
import "../../resources/autosuggest.css";
import "../../resources/site.css";

export default class Buyer extends Component {
  render() {
    return (
      <div>
        <BuyerAutoComplete />
      </div>
    );
  }
}
