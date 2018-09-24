import React, { Component } from 'react'
import BuyerAutoComplete from '../ReactFormAutoBuyer';
import "../../resources/autosuggest.css";
import "../../resources/site.css";

let Token = "";
export default class Buyer extends Component {
  render() {
    Token = this.props.token;
    let {vendor} = this.props
    return (
      <div>
        <BuyerAutoComplete
          token={Token}
          IdiSocioComprador={''}  />
      </div>
    );
  }
}
