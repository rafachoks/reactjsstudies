import React, { Component } from 'react'
import Address from '../../components/common/Address.js';
import '../../resources/site.css';



class ReactFormLabel extends Component {
  render() {
    return (
      <div>
        <label htmlFor={this.props.htmlFor}>{this.props.title}</label>
      </div>
    );
  }
}

export default class NewForCompany extends Component{
   constructor(props) {
     super(props);
    this.state = {
      name: '',
      cnpj: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
      handleChange = (e) => {
      let newState = {};
      newState[e.target.name] = e.target.value;
      this.setState(newState);
    };
    handleSubmit = (e, message) => {
      e.preventDefault()
    
      let formData = {
        formName: this.state.name,
        formCnpj: this.state.cnpj,
      }
    
      if (formData.formName.length < 1 || formData.formCnpj.length < 1){
       return false
      }
      this.setState({
      name: '',
      cnpj: ''
      });
    }
   
    render() {
      return (
        <div className='react-form' onSubmit={this.handleSubmit} >
           <h1>Cadastro de comprador Pessoa Juridica</h1>
           <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formName' title='Razao Social:' />
              <input id='formName' className='form-input' name='name' type='text' required onChange={this.handleChange} value={this.state.name} />
           </fieldset>
           <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formCnpj' title='CNPJ:' />
              <input id='formCnpj' className='formCnpj' name='cnpj' type='text' required onChange={this.handleChange} value={this.state.cnpj} />
           </fieldset>
              <Address />
            <div className='form-group'>
              <input id='formButton' className='btn' type='submit' placeholder='Enviar Cadastro' value='Enviar Cadastro' />
          </div>
        </div>
      );
    }
}
