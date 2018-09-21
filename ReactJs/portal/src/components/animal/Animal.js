import React from "react";
import AnimalAutoComplete from "./../ReactFormAutoAnimal.js";
import "../../resources/autosuggest.css";
import "../../resources/site.css";

export default class Animal extends React.Component {
  render() {
    return (
      <div>
        <AnimalAutoComplete />
      </div>
    );
  }
}
