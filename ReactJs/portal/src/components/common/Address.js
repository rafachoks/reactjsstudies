import React, { Component } from 'react';
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

export default class Address extends React.Component{
   constructor(props) {
     super(props);
     this.state={
       email:'',
       address:'',
       addOn:'',
       neighborhood:'',
       city:'',
       state:'',
       zipcode:''
     }

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
          formEmail: this.state.email,
          formAddress: this.state.address,
          formAddOn: this.state.addOn,
          formNeighborhood: this.state.neighborhood,
          formCity: this.state.city,
          formState: this.state.state,
          formZipCode: this.state.zipcode
        }
  
        if (formData.formEmail.length < 1 ||
            formData.formAddress.length < 1 ||
            formData.formNeighborhood.length < 1 ||
            formData.formCity.length < 1 ||
            formData.formZipCode.length < 1 ||
            formData.formState.length < 1){
        return false
        }
        this.setState({
          email:'',
          address:'',
          addOn:'',
          neighborhood:'',
          city:'',
          state:'',
          zipcode:''
        });
    }
    render() {
        return (
                <div>
                  <fieldset className='form-group'>
                        <fieldset className='form-group'>
                          <ReactFormLabel htmlFor='formEmail' title='Email:' />
                    
                          <input id='formEmail' className='form-input' name='email' type='email' />
                        </fieldset>
                    
                        <fieldset className='form-group'>
                          <ReactFormLabel htmlFor='formAddress' title='Endereço:'/>
                    
                          <input id='formAddress' className='form-input' name='address' type='text'  />
                        </fieldset>
                    
                        <fieldset className='form-group'>
                          <ReactFormLabel htmlFor='formAddOn' title='Complemento:' />
                          
                          <input id='formAddOn' className='form-input' name='addOn' type='text' />
                        </fieldset>
                    
                        <fieldset className='form-group'>
                          <ReactFormLabel htmlFor='formNeighborhood' title='Bairro:' />
                          
                        <input id='formNeighborhood' className='form-input' name='neighborhood' type='text' />
                        </fieldset>

                        <fieldset className='form-group'>
                            <ReactFormLabel htmlFor='formCity' title='Cidade:' />
                            <input id='formCity' className='form-input' name='city' type='text' />
                        </fieldset>
                    
                        <fieldset className='form-group'>
                        <ReactFormLabel htmlFor='formState' title='Estado:' />
                        
                        <input id='formState' className='form-input' name='state' type='text' />
                        </fieldset>

                        <fieldset className='form-group'>
                        <ReactFormLabel htmlFor='formZipCode' title='Cep:' />
                        
                        <input id='formZipCode' className='form-input' name='zipcode' type='text' />
                      </fieldset>
                    </fieldset>
                  </div>
        );
    }
}