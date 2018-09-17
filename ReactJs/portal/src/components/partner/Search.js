import React, { Component } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import '../../resources/autosuggest.css';
import '../../resources/site.css';
import Modal from 'react-responsive-modal';
import New from './New';
import NewForCompany from './NewForCompany';

let CdsPadraoNomeCPFCNPJ = '';
let resultApi = [
    {
      "IdiSocio": '',
      "NmsCompleto": "",
      "CdsPadrao": "",
      "CdsCPFCNPJ": ""
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
      <span>{suggestion.NmsCompleto}</span>
    );
  }

  function ShowBuyer(){
        return <New/>
  }
  function ShowBuyerCompany(){
    return <NewForCompany/>
}

  

  

export default class Animal extends Component {
    constructor(props) {
        super(props);
       this.state = {
         IdiSocioProprietario:'',
         resultList: [],
         value: '',
         suggestions: [],
         openPf: false,
         openCnpj: false,    
       };
    
       this.handleSubmit = this.handleSubmit.bind(this);
     }
    onOpenModal = () => {
      this.setState({ openPf: true });
    };
  
    onCloseModal = () => {
      this.setState({ openPf: false });
    };

    onOpenModalCnpj = () => {
      this.setState({ openCnpj: true });
    };
  
    onCloseModalCnpj = () => {
      this.setState({ openCnpj: false });
    };

    componentWillMount() {
      CdsPadraoNomeCPFCNPJ = '';
        axios.post('http://dev.wafx.global/abccrm/api/api/socio/AutoCompleteListaPessoa'
        , {CdsPadraoNomeCPFCNPJ}
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
      const { openPf } = this.state;
      const { openCnpj } = this.state;
        const { value, suggestions  } = this.state;
        const inputProps = {
          placeholder: 'Informe o nome do comprador',
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
                  <div className='form-group'>
                    <input id='formButton' 
                            className='btn_new' 
                            type='button' 
                            placeholder='Adicionar Comprador'
                            onClick={this.onOpenModal} 
                            value='Cadastrar Pessoa Fisica' />
                    <input id='formButton' 
                            className='btn_new' 
                            type='button' 
                            placeholder='Adicionar Comprador'
                            onClick={this.onOpenModalCnpj} 
                            value='Cadastrar Empresa' />
                            <Modal open={openPf} onClose={this.onCloseModal} center>
                                <ShowBuyer />
                            </Modal>
                            <Modal open={openCnpj} onClose={this.onCloseModalCnpj} center>
                              <ShowBuyerCompany />
                            </Modal>
                  </div>
            </fieldset>          
          </div>
        );
    }
}




