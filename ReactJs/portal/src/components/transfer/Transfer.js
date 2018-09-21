import React, { Component } from "react";
import Axios from "axios";
import Animal from "../animal/Animal.js";
import Search from "../partner/Buyer.js";
import Radio from "./../ReactFormRadio.js";
import Label from './../ReactFormLabel.js';
import ReactFormCalendar from '../../components/ReactFormCalendar'
import "./../../resources/datepicker.css";


const CdsToken = "863977A2-4984-46AC-A746-8DF22368E06D";
let IdiSocio = {
  IdiSocio: "",
  CdsPadrao: "",
  NmsCompleto: "",
  CdsSexo: "",
  CdsCPFCNPJ: "",
  DtdNascimento: ""
};

function ShowPage(props) {
  const id = IdiSocio.IdiSocio;
  if (id !== "") {
    return (
      <div>
        <fieldset className="form-group">
          <Animal idSocio={id} token={CdsToken} />
          <Search idSocio={id} token={CdsToken} />
        </fieldset>
        <ReactFormCalendar />
        <Label
          className="form-label"
          htmlForm="formBuyer"
          title="Selecione como deseja encaminhar os documentos:"
        />
          <Radio
            hasLabel="true"
            htmlFor="radioOne"
            id="radioOne"
            label="Solicitar 2ª via Certidão:"
            name="radios"
            required={true}
          />
          <Radio
            hasLabel="true"
            htmlFor="radioTwo"
            label="Enviar ao ABCCRM:"
            name="radios"
            required={true}
          />
        <fieldset className="form-group">
          <input
            id="formButton"
            className="btn_new"
            name="btnEnviaSol"
            type="submit"
            placeholder="Enviar"
            value="Solicitar Transferência"
          />
        </fieldset>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Você não esta autorizado a ver esta pagina</h2>
      </div>
    );
  }
}

export default class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IdiSocio: [],
      data: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //handlers
  handleChange = event => {
    let newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  };
  handleSubmit = (event, message) => {
    event.preventDefault();

    const formData = {
      IdiAnimal: this.state.IdiAnimal,
      IdiSocioVendedor: this.state.IdiSocio,
      IdiSocioComprador: this.state.IdiSocioVendedor,
      DtdTransferencia: this.state.data,
      Flg2ViaCertificado: this.state.radioOne
    };
    Axios.post(
      "http://localhost:51798/api/socio/Autenticar",
      JSON.stringify(formData),
      {
        headers: {
          Authorization: "Basic " + CdsToken,
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => {
        alert("Solicitação realizada com sucesso!");
      })
      .catch(function(error) {
        alert("Ocorreu um erro ao tentar gravar a transferência!");
      });
  };

  componentDidMount = () => {
    Axios.post(
      "http://localhost:51798/api/socio/SocioByToken",
      { CdsToken },
      {
        headers: {
          Authorization: "Basic " + CdsToken,
          "Content-Type": "application/json"
        }
      }
    ).then(res => {
      IdiSocio = res.data.IdiSocio;
      this.setState(IdiSocio);
    });
  };

  render() {
    return (
      <form className="react-form" onSubmit={this.handleSubmit}>
        <h2>Transferência Online de Animais</h2>
        <div>
          <ShowPage />
        </div>
      </form>
    );
  }
}
