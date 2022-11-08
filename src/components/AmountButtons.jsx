import React from 'react';
import styled from 'styled-components';
import { getTotalAmount } from '@utils/helpers';
import { FaPlus, FaMinus } from 'react-icons/fa';

const AmountButtons = ({ increase, decrease, amount, ServingSize}) => {
  const totalAmount = getTotalAmount(amount, ServingSize);
  return (
    <Wrapper className='amount-btns'>
      <button type='button' className='amount-btn' onClick={decrease}>
        <FaMinus />
      </button>
      <h2 className='amount'>{amount}</h2>
      <button type='button' className='amount-btn' onClick={increase}>
        <FaPlus />
      </button>
      <h5 className='amount'>{totalAmount}</h5>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
  .amount {
    text-align: center;
  }
`;

export default AmountButtons;
