import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { clear, addOperand, addOperator, evalTotal } from '../actions';

class KeyPad extends Component {
  constructor(props) {
    super(props);
    this.state = { operands: [], operand: '' };
    this.handleOperand = this.handleOperand.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleEqual = this.handleEqual.bind(this);
  };

  handleOperand = async event => {
    const input = event.target.innerHTML;
    const newOp = [...this.state.operands, input];

    await this.setState({ operands: newOp, operand: newOp.join('') });
    await this.props.addOperand(this.state.operands);
  };

  handleClear = async event => {
    if (event) this.props.clear();
    await this.setState({ operands: [], operand: '' });
  };

  handleOperator(event) {
    const { operand } = this.state;
    const name = event.target.id;
    const symbol = event.target.innerHTML;

    if (operand) this.props.addOperand(operand, true);
    this.props.addOperator(name, symbol);
    this.handleClear();
  };

  handleEqual() {
    const { operand } = this.state;

    if (operand) this.props.addOperand(operand, true);
    else this.props.addOperand(0);
    this.handleClear();
    this.props.evalTotal();
  };

  render() {
    return (
      <div className='buttons'>
        <div className='button-container'>
          <button id='button7' value='7' onClick={this.handleOperand}>7</button>
          <button id='button8' value='8' onClick={this.handleOperand}>8</button>
          <button id='button9' value='9' onClick={this.handleOperand}>9</button>
          <button id='multiply' onClick={this.handleOperator}>x</button>
        </div>
        <div className='button-container'>
          <button id='button4' value='4' onClick={this.handleOperand}>4</button>
          <button id='button5' value='5' onClick={this.handleOperand}>5</button>
          <button id='button6' value='6' onClick={this.handleOperand}>6</button>
          <button id='divide' onClick={this.handleOperator}>&#247;</button>
        </div>
        <div className='button-container'>
          <button id='button1' value='1' onClick={this.handleOperand}>1</button>
          <button id='button2' value='2' onClick={this.handleOperand}>2</button>
          <button id='button3' value='3' onClick={this.handleOperand}>3</button>
          <button id='add' onClick={this.handleOperator}>+</button>
        </div>
        <div className='button-container'>
          <button id='button0' value='0' onClick={this.handleOperand}>0</button>
          <button id='clearButton' onClick={this.handleClear}>C</button>
          <button id='equalsButton' onClick={this.handleEqual}>=</button>
          <button id='substract' onClick={this.handleOperator}>-</button>
          <button id='decimal' onClick={this.handleOperand}>.</button>
        </div>
      </div>
    );
  };
};

KeyPad.propTypes = {
  clear: PropTypes.func.isRequired,
  addOperand: PropTypes.func.isRequired,
  addOperator: PropTypes.func.isRequired
};

export default connect(null, {
  clear, addOperand, addOperator, evalTotal
})(KeyPad);
