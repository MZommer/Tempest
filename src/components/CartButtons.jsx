import React from 'react';
import { FaCartPlus, FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { IoLogoUsd} from 'react-icons/io';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useProductsContext } from '@contexts/ProductsContext';
import { useCartContext } from '@contexts/CartContext';
// import { useUserContext } from '../context/user_context';
import {saldo} from '@utils/constants';


const CartButtons = () => {
  const { closeSidebar } = useProductsContext();
  const { total_items, clearCart } = useCartContext();
  // const { loginWithRedirect, myUser, logout } = useUserContext();
  let myUser, logout 
  return (
    <Wrapper className='cart-btn-wrapper'>

      {myUser ? (
        <button
          type='button'
          className='auth-btn'
          onClick={() => {
            clearCart();
            logout({ returnTo: window.location.origin });
          }}
        >
          Logout <FaUserMinus />
        </button>
      ) : (
        /*<button type='button' className='auth-btn' onClick={loginWithRedirect}>
                     <IoLogoUsd /> {saldo} 
                    
        </button>*/
        <Link to='/balance' onClick={closeSidebar} className='cart-btn'>
        {saldo}
        <span className='cart-container'>
          <IoLogoUsd />
        </span>
      </Link>
      )}
            <Link to='/cart' onClick={closeSidebar} className='cart-btn'>
        Cart
        <span className='cart-container'>
          <FaCartPlus />
          <span className='cart-value'>{total_items}</span>
        </span>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;
export default CartButtons;