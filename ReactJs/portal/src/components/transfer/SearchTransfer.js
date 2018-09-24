import React, { Component } from "react";
import ReactFormAutoAnimal from "../../components/ReactFormAutoAnimal.js";
import ReactFormAutoBuyer from "../../components/ReactFormAutoBuyer.js";
import "./../../resources/searchtransfer.css";
import ReactFormLabel from "../ReactFormLabel.js";
import ReactFormCalendar from "../ReactFormCalendar.js";

const CdsToken = "863977A2-4984-46AC-A746-8DF22368E06D";
export default class SearchTransfer extends Component {
  render() {
    return (
      <div>
        <h2>Pesquisa Transferências</h2>
        <fieldset className="form-group">
          <ReactFormAutoAnimal token={CdsToken} />
          <ReactFormAutoBuyer token={CdsToken} />
          <ReactFormLabel htmlFor="formSearch" title="De:" />
          <ReactFormCalendar id="fromDate" />
          <ReactFormLabel htmlFor="formSearch" title="Até:" />
          <ReactFormCalendar id="toDate" />
        </fieldset>
      </div>
    );
  }
}
