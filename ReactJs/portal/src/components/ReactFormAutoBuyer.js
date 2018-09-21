import React, { Component } from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import Label from "./../components/ReactFormLabel";

let CdsPadraoNomeCPFCNPJ = "";
let resultApi = [
  {
    IdiSocio: "",
    NmsCompleto: "",
    CdsPadrao: "",
    CdsCPFCNPJ: ""
  }
];
let Token = "";

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
  return `${suggestion.NmsCompleto} ${suggestion.CdsPadrao}`;
}

function renderSuggestion(suggestion) {
  return <span>{suggestion.NmsCompleto}</span>;
}

function callBuyerSearch() {
  CdsPadraoNomeCPFCNPJ = "";
  axios
    .post(
      "http://localhost:51798/api/socio/AutoCompleteListaPessoa",
      { CdsPadraoNomeCPFCNPJ },
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

export default class BuyerAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IdiSocioProprietario: "",
      resultList: [],
      value: "",
      suggestions: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    callBuyerSearch();
  }


  handleSubmit = (event, message) => {
    event.preventDefault();
  };
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
    Token = this.props.token;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Digite para iniciar a pesquisa",
      value,
      onChange: this.onChange
    };
    return (
      <div>
        <Label
          className="form-label"
          htmlForm="formBuyer"
          title="Informe o nome do comprador:"
        />
        <fieldset className="form-group">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </fieldset>
      </div>
    );
  }
}
