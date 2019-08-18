import React, { Component } from 'react';
import { CustomInput } from 'reactstrap';
import uuid from 'uuid';

class Checkbox extends Component {
    state = {
      isChecked: this.props.checked
    }

    onChange = () => {
      this.setState({ isChecked: !this.state.isChecked }, () => {
        this.props.onChange(this.props.name, this.state.isChecked);
      });
    }

    render(){
      return(
        <CustomInput type={'switch'} id={uuid()} name={this.props.name} checked={this.state.isChecked} onChange={this.onChange} />
      )
    }
}

export default Checkbox;