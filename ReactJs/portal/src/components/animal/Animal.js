import React from "react";
import AnimalAutoComplete from "./../ReactFormAutoAnimal.js";
import "../../resources/autosuggest.css";
import "../../resources/site.css";

let IdSocio = "";
let Token = "";
export default class Animal extends React.Component {
  render() {
    IdSocio = this.props.idSocio;
    Token = this.props.token;
    return (
      <div>
        <AnimalAutoComplete idiSocio={IdSocio} token={Token} />
      </div>
    );
  }
}
