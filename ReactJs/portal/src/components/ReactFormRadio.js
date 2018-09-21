import React from "react";

export default class ReactFormRadio extends React.Component {
  render() {
    return (
      <fieldset className="form-group">
        <label htmlFor={this.props.htmlFor} label={this.props.label}>
          <input
            id={this.props.htmlFor}
            name={this.props.name || null}
            required={this.props.required || null}
            type="radio"/>
          {this.props.label}
        </label>
      </fieldset>
    );
  }
}
