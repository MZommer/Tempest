import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '@contexts/CartContext';
import CartContent from '@components/CartContent';
import PageHero from '@components/PageHero';

const CartPage = () => {
  const { cart } = useCartContext();
  if (cart.length < 1) {
    return (
      <Wrapper className='page-100'>
        <div className='empty'>
          <h2>Su carrito esta vacio</h2>
        </div>
      </Wrapper>
    );
  }
  return (
    <main>
      <PageHero title='cart' />
      <Wrapper className='page'>
        <CartContent />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
