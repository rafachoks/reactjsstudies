import React, { Component } from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import Label from './ReactFormLabel.js'

let IdiSocioProprietario = "";
let Token = "";
let CdsNomeRegistro = "";
let resultApi = [
  {
    IdiAnimal: "",
    NmsCompleto: "",
    CdsPadrao: ""
  }
];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("^" + escapedValue, "i");

  return resultApi.filter(lang => regex.test(lang.NmsCompleto));
}

function getSuggestionValue(suggestion) {
  return suggestion.NmsCompleto + "( " + suggestion.CdsPadrao + " )";
}

function onSuggestionSelected(suggestion) {
  return suggestion.IdiAnimal;
}

function renderSuggestion(suggestion) {
  return (
    <span>
      {suggestion.NmsCompleto}({suggestion.CdsPadrao})
    </span>
  );
}

function callAnimalSearch() {
  CdsNomeRegistro = "";
  axios
    .post(
      "http://localhost:51798/api/transferencia/AutoCompleteListaAnimaisBySocio",
      { IdiSocioProprietario, CdsNomeRegistro },
      {
        headers: {
          Authorization: "Basic " + Token,
          "Content-Type": "application/json"
        }
      }
    )
    .then(res => {
      resultApi = res.data.result;
    });
}

export default class AnimalAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IdiSocioProprietario: "",
      resultList: [],
      value: "",
      suggestions: []
    };
  }

  componentDidMount() {
    callAnimalSearch();
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    IdiSocioProprietario = this.props.idSocio;
    Token = this.props.token;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Digite para iniciar a pesquisa",
      value,
      onChange: this.onChange
    };
    return (
      <div>
        <Label  htmlFor='formSuggestion' title='Informe o nome do animal:' />
        <fieldset className="form-group">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            onSuggestionSelected={onSuggestionSelected}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </fieldset>
      </div>
    );
  }
}
