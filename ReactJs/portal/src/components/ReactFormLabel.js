import React from "react";

export default class ReactFormLabel extends React.Component {
  render() {
    return (
        <label className='form-label' htmlFor={this.props.htmlFor}>{this.props.title}</label>
    );
  }
}
