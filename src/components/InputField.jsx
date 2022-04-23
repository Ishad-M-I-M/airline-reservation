import React from 'react';

class InputField extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="inputField mb-3">
        <input 
          className='input form-control'
          type = {this.props.type}
          placeholder = {this.props.placeholder}
          value = {this.props.value}
          onChange= { (e) => {this.props.onChange(e.target.value);}}
        />
      </div>
    );
  }
}

export default InputField;
