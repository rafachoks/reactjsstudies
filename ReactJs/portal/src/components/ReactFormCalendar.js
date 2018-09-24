import React, { Component } from "react";
import ReactFormLabel from "./ReactFormLabel.js";
import Datetime from "react-datetime";
require("moment/locale/pt-br");

export default class ReactFormCalendar extends Component {
  render() {
    var yesterday = Datetime.moment().subtract( 0, 'day' );
    var valid = function( current ){
        return current.isBefore( yesterday );
    };
    return (
      <div>
        <ReactFormLabel
          htmlForm="formCalendar"
          title="Informe a data da transferência"
        />
        <fieldset className="form-group">
          <Datetime
            locale="pt-br"
            dateFormat="DD/MM/YYYY"
            timeFormat={false}
            required={true}
            isValidDate={valid}
          />
        </fieldset>
      </div>
    );
  }
}
