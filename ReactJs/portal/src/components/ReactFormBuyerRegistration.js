import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import New from './partner/New';
import NewForCompany from './partner/NewForCompany';


let Token = "";

  function ShowBuyer() {
    return <New token={Token} />;
  }
  function ShowBuyerCompany() {
    return <NewForCompany token={Token} />;
  }
  

export default class ReactFormBuyerRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
          openPf: false,
          openCnpj: false
        };
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
  render() {
    Token = this.props.token;
    const { openPf } = this.state;
    const { openCnpj } = this.state;
    return (
      <div>
      <input
      id="formButton"
      className="btn_new"
      type="button"
      placeholder="Adicionar Comprador"
      onClick={this.onOpenModal}
      value="Cadastrar Pessoa Fisica"
    />
    <input
      id="formButton"
      className="btn_new"
      type="button"
      placeholder="Adicionar Comprador"
      onClick={this.onOpenModalCnpj}
      value="Cadastrar Empresa"
    />
    <Modal open={openPf} onClose={this.onCloseModal} center>
    <ShowBuyer token={Token} />
  </Modal>
  <Modal open={openCnpj} onClose={this.onCloseModalCnpj} center>
    <ShowBuyerCompany token={Token} />
  </Modal>
      </div>
    )
  }
}
