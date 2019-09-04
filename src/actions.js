import {
  CLEAR_ALL,
  ADD_OPERAND,
  ADD_OPERATOR,
  EVAL_PRECEDENCE
} from './types';

export const clear = () => {
  return {
    type: CLEAR_ALL
  };
};

export const addOperand = (operand, update = null) => dispatch => {
  if (update) {
    dispatch ({
      type: ADD_OPERAND,
      payload: operand
    });
  } else {
    // Update display only
    console.log(operand)
  }
};

/**
 * 
 * @param {*} operator_name Name of operator. Ej: 'multiply'
 * @param {*} operator Symbol. Ej: '*'
 */
export const addOperator = (operator_name, operator) => dispatch => {
  dispatch({
    type: ADD_OPERATOR,
    payload: {
      name: operator_name,
      sym: operator
    }
  });
  dispatch(evalByPrecedence());
};

const evalByPrecedence = () => (dispatch, getState) => {
  const state = getState();
  const lastOperator = state.operators.slice(0)[1];

  if (lastOperator === 'multiply' || lastOperator === 'divide') {
    dispatch({
      type: EVAL_PRECEDENCE
    });
  }
};
