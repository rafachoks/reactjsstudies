import React, { Component } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import '../../resources/autosuggest.css';
import '../../resources/site.css';
import Search from './../partner/Search';

let IdiSocioProprietario = '';
let CdsNomeRegistro = ''
let resultApi = [
    {
        'IdiAnimal': '',
        'NmsCompleto': '',
        'CdsPadrao': ''
    }
  ];


function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
  
function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
  
    return resultApi.filter(lang => regex.test(lang.NmsCompleto));
  }
  
  function getSuggestionValue(suggestion) {
    ShowBuyer(suggestion);
    return suggestion.NmsCompleto;
  }

  function onSuggestionSelected(suggestion){
    return ShowBuyer(suggestion);
  }
  
  function renderSuggestion(suggestion) {
    return (
      <span>{suggestion.NmsCompleto}({suggestion.CdsPadrao})</span>
    );
  }

  function ShowBuyer(suggestion){
     if(suggestion.IdiAnimal != null){
        return <Search/>
     }else{
       return(
         <fieldset className='form-group'>
          <p></p>
         </fieldset>
       );
     }
  }

  

export default class Animal extends Component {
    constructor(props) {
        super(props);
       this.state = {
         IdiSocioProprietario:'',
         resultList: [],
         value: '',
         suggestions: []  
       };
    
       this.handleSubmit = this.handleSubmit.bind(this);
     }

    componentWillMount() {
        IdiSocioProprietario = 567;
        CdsNomeRegistro = '';
        axios.post('http://dev.wafx.global/abccrm/api/api/transferencia/AutoCompleteListaAnimaisBySocio'
        , {IdiSocioProprietario, CdsNomeRegistro}
        , {headers: {
            'Authorization' : 'Basic 0c07bc17-4d4a-4a08-bb3e-6804524c7f07',
            'Content-Type':'application/json'
            }
          })
          .then(res => {
            resultApi = res.data.result;
            this.setState({ resultApi });
          })
      };
     
    handleSubmit = (event, message) => {
        event.preventDefault()
       
         let formData = {
           formAnimal: this.state.name,
         }
   
         if (formData.formName.length < 1){
          return false
         }
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
        const { value, suggestions  } = this.state;
        const inputProps = {
          placeholder: 'Informe o nome do animal',
          value,
          onChange: this.onChange
        };
        return (
          <div>
          <fieldset className='form-group'>
              <Autosuggest 
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              onSuggestionSelected = {onSuggestionSelected}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps} />
              <ShowBuyer />
            </fieldset>           
          </div>
        );
    }
}

