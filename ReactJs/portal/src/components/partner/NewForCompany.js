import React, { Component } from 'react'
import Axios from 'axios';
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
         zipcode:''
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
            CdsCPFCNPJ: this.state.cnpj,
            CdsEMail: this.state.email,
            CdsFinalidadeEndereco: 'R',
            NmsEndereco: this.state.address,
            NmsBairro: this.state.neighborhood,
            IdiCidade: 9668, //ver com Nelson
            CdiCEP: this.state.zipcode,
            CdsFinalidadeTelefone1:'L',
            CdiDDD1:11,
            CdsNumero1:'99953-2516',
            CdsFinalidadeTelefone2:'R',
            CdiDDD2:12,
            CdsNumero2:'3101-1571',
         };
         console.log(JSON.stringify(formData));
         Axios.post('http://dev.wafx.global/abccrm/api/api/transferencia/GravarNovoSocio', { formData }, {headers: {
          'Authorization' : 'Basic 0c07bc17-4d4a-4a08-bb3e-6804524c7f07',
          'Content-Type':'application/json'
          }
        })
         .then(res => {
          alert('Comprador cadastrado');
         });
       }
    render(){
        return(
          <form className='react-form' onSubmit={this.handleSubmit}>
          <h1>Cadastro de Comprador Pessoa Juridica</h1>
      
          <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formName' title='Nome Empresa:' />
              <input id='formName' className='form-input' name='name' type='text' required onChange={this.handleChange} value={this.state.name} />
          </fieldset>
      
          <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formCpf' title='CNPJ:' />
              <input id='formCpf' className='form-input' name='cnpj' type='text' require onChange={this.handleChange} value={this.state.cpf} />
          </fieldset>
          <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formEmail' title='Email:' />
      
              <input id='formEmail' className='form-input' name='email' type='email' require onChange={this.handleChange} value={this.state.email} />
          </fieldset>

        <fieldset className='form-group'>
          <ReactFormLabel htmlFor='formZipCode' title='Cep:' />
  
          <input id='formZipCode' className='form-input' name='zipcode' type='text' require onChange={this.handleChange} value={this.state.zipcode} />
        </fieldset>
      
          <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formAddress' title='Endereço:' />
      
              <input id='formAddress' className='form-input' name='address' type='text' require onChange={this.handleChange} value={this.state.address} />
          </fieldset>
      
          <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formAddOn' title='Complemento:' />
      
              <input id='formAddOn' className='form-input' name='addOn' type='text' require onChange={this.handleChange} value={this.state.addOn} />
          </fieldset>
      
          <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formNeighborhood' title='Bairro:' />
      
              <input id='formNeighborhood' className='form-input' name='neighborhood' type='text' require onChange={this.handleChange} value={this.state.neighborhood} />
          </fieldset>
      
          <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formCity' title='Cidade:' />
              <input id='formCity' className='form-input' name='city' type='text' require onChange={this.handleChange} value={this.state.city} />
          </fieldset>
      
          <fieldset className='form-group'>
              <ReactFormLabel htmlFor='formState' title='Estado:' />
      
              <input id='formState' className='form-input' name='state' type='text' require onChange={this.handleChange} value={this.state.state} />
          </fieldset>

          <div className='form-group'>
              <input id='formButton' className='btn' type='submit' placeholder='Enviar Cadastro' value='Enviar Cadastro' />
          </div>
      </form>
      );
    }
}