import React, { Component } from 'react'
import Datetime from "react-datetime";
require("moment/locale/pt-br");
export default class ReactFormCalendar extends Component {
  render() {
    return (
        <fieldset className="form-group">
          <Datetime
            locale="pt-br"
            dateFormat="DD/MM/YYYY"
            timeFormat={false}
            required={true}
          />
        </fieldset>
    )
  }
}
