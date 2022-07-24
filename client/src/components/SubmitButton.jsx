import React from 'react';

class SubmitButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="submitButton">
        <button
          className='btn btn-primary'
          disabled = {this.props.disabled}
          onClick = {() => this.props.onClick()}
        >
          {this.props.text}
        </button>
      </div>
    );
  }
}

export default SubmitButton;
