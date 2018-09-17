import React, { Component } from 'react'
import Axios from 'axios';
import Datetime from 'react-datetime';
import Animal from '../animal/Animal.js';
import Search from '../partner/Search.js';
import './../../resources/datepicker.css';


const CdsToken = '8B066FCE-5350-45A9-AC40-2C69F19F3005';
let IdiSocio = {
  'IdiSocio': '',
  'CdsPadrao': '',
  'NmsCompleto': '',
  'CdsSexo': '',
  'CdsCPFCNPJ': '',
  'DtdNascimento': ''
};

function ShowPage(props) {
   const id = IdiSocio.IdiSocio;
   if(id != null){
     return (
       <div>
          <fieldset className='form-group'>
              <Animal idSocio={id}/>
              <Search />
          </fieldset>
          <fieldset className='form-group'>
              <Datetime locale="pt-br" inputProps={{ placeholder: 'Data da transferência', disabled: false }} /> 
          </fieldset>
          <fieldset className='form-group'>
              <div className="radio">
              <label>
              <input type="radio" value="segundaVia"/>
                Solicitar 2ª via Certidão
              </label>
            </div>
            <div className="radio">
              <label>
              <input type="radio" value="enviarAbccrm" />
                 Enviar ao ABCCRM  
              </label>
            </div>
          </fieldset>
          <fieldset className='form-group'>
              <input id='formButton' className='btn_new' name='btnEnviaSol' type='submit' placeholder='Enviar' value='Solicitar Transferência' />
              <input id='formButton' className='btn_new' name='btnCancelaSol' type='submit' placeholder='Enviar' value='Enviar Cadastro' />
          </fieldset>
       </div>
     );
   }
   else{
     return(
       <div>
       <h1>Você não esta autorizado a ver esta pagina</h1>
       </div>
     )
   }
}

export default class Transfer extends Component {
  constructor(props) {
    super(props);
   this.state = {
    IdiSocio: [],
    data:''
   };
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }


//handlers
 handleChange = (event) => {
     let newState = {};
     newState[event.target.name] = event.target.value;
     this.setState(newState);
   };
 handleSubmit = (event, message) => {
    event.preventDefault();
    let formData = {
      formDate: this.state.data,
    }
  
    if (formData.formDate.length < 1){
     return false
    }
    this.setState({
      date: '',
      });
   }

   componentDidMount = () => {
    Axios.post('http://dev.wafx.global/abccrm/api/api/socio/SocioByToken', 
    {CdsToken}, {headers: {
      'Authorization' : 'Basic 0c07bc17-4d4a-4a08-bb3e-6804524c7f07',
      'Content-Type':'application/json'
      }
    })
    .then(res =>{
     IdiSocio = res.data.IdiSocio;
     this.setState(IdiSocio);
    });
  }
  
  render() {
    return (
      <form className='react-form'>
        <h1>Transferência Online de Animais</h1>
        <div>
           <ShowPage />
        </div>
      </form>
    )
  }
}