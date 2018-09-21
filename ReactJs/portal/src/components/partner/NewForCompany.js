import React, { Component } from 'react'
import Axios from 'axios';
import '../../resources/site.css';

let Token = '';
class ReactFormLabel extends Component {
    render() {
      return (
        <div>
          <label htmlFor={this.props.htmlFor}>{this.props.title}</label>
        </div>
      );
    }
  }

export default class New extends Component{
    constructor(props) {
        super(props);
       this.state = {
         name: '',
         cnpj: '',
         email:'',
         address:'',
         addOn:'',
         neighborhood:'',
         city:'',
         state:'',
         zipcode:'',
         phoneDDD:'',
         phone:'',
         phoneRecDDD:'',
         phoneRec:'',
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
       
         const formData = {
            CdsTipoPessoa:'J',
            NmsCompleto: this.state.name,
            CdsCPFCNPJ: this.state.cpf,
            CdsEMail: this.state.email,
            CdsFinalidadeEndereco: 'R',
            NmsEndereco: this.state.address,
            NmsBairro: this.state.neighborhood,
            IdiCidade: 9668, //ver com Nelson
            CdiCEP: this.state.zipcode,
            CdsFinalidadeTelefone1:'L',
            CdiDDD1:this.state.phoneDDD,
            CdsNumero1:this.state.phone,
            CdsFinalidadeTelefone2:'R',
            CdiDDD2:this.state.phoneRecDDD,
            CdsNumero2:this.state.phoneRec,
         };
         console.log(JSON.stringify(formData));
         Axios.post('http://localhost:51798/api/transferencia/GravarNovoSocio', JSON.stringify(formData), {headers: {
          'Authorization' : 'Basic ' + Token,
          'Content-Type':'application/json'
          }
        })
         .then(res => {
          alert('Comprador cadastrado!');
         });
       }
    render(){
        Token = this.props.token;
        return(
          <form className='react-form' onSubmit={this.handleSubmit}>
          <h1>Cadastro de Comprador Pessoa Fisica</h1>
      
          <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formName' title='Nome da Empresa:' />
              <input id='formName' className='form-input' name='name' type='text' require="true" onChange={this.handleChange} value={this.state.name} />
          </fieldset>
      
          <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formCpf' title='CPF:' />
              <input id='formCpf' className='form-input' name='cnpj' type='text' require="true" onChange={this.handleChange} value={this.state.cnpj} />
          </fieldset>
          <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formEmail' title='Email:' />
      
              <input id='formEmail' className='form-input' name='email' type='email' require="true" onChange={this.handleChange} value={this.state.email} />
          </fieldset>

        <fieldset className='form-group'>
          <ReactFormLabel htmlFor='formZipCode' title='Cep:' />
  
          <input id='formZipCode' className='form-input' name='zipcode' type='text' require="true" onChange={this.handleChange} value={this.state.zipcode} />
        </fieldset>
      
          <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formAddress' title='Endereço:' />
      
              <input id='formAddress' className='form-input' name='address' type='text' require="true" onChange={this.handleChange} value={this.state.address} />
          </fieldset>
      
          <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formAddOn' title='Complemento:' />
      
              <input id='formAddOn' className='form-input' name='addOn' type='text'  onChange={this.handleChange} value={this.state.addOn} />
          </fieldset>
      
          <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formNeighborhood' title='Bairro:' />
      
              <input id='formNeighborhood' className='form-input' name='neighborhood' type='text' require="true" onChange={this.handleChange} value={this.state.neighborhood} />
          </fieldset>
      
          <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formCity' title='Cidade:' />
              <input id='formCity' className='form-input' name='city' type='text' require="true" onChange={this.handleChange} value={this.state.city} />
          </fieldset>
      
          <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formState' title='Estado:' />
      
              <input id='formState' className='form-input' name='state' type='text' require="true" onChange={this.handleChange} value={this.state.state} />
          </fieldset>

          <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formPhone' title='Telefone Principal:' />
              <input id='formPhoneDDD' placeholder='DDD' className='form-input' name='phoneDDD' type='text' require="true" onChange={this.handleChange} value={this.state.phoneDDD} />
              <input id='formPhone' placeholder='cel: xxxxx-xxxx fone:xxxx-xxxx' className='form-input' name='phone' type='text' require="true" onChange={this.handleChange} value={this.state.phone    } />
          </fieldset>

          <fieldset className='form-group'>
            <ReactFormLabel htmlFor='formPhone' title='Telefone Principal:' />
            <input id='formPhoneRecDDD' placeholder='DDD' className='form-input' name='phoneRecDDD' type='text'  onChange={this.handleChange} value={this.state.phoneRecDDD} />
            <input id='formPhoneRec'  placeholder='cel: xxxxx-xxxx fone:xxxx-xxxx'  className='form-input' name='phoneRec' type='text'  onChange={this.handleChange} value={this.state.phoneRec} />
          </fieldset>

          <div className='form-group'>
              <input id='formButton' className='btn' type='submit' placeholder='Enviar Cadastro' value='Enviar Cadastro' />
          </div>
      </form>
      );
    }
}