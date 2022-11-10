import styled from 'styled-components';
import { useCartContext } from '@contexts/CartContext';
import CartColumns from './CartColumns';
import CartItem from './CartItem.jsx';
import CartTotals from './CartTotals';
import CartPercenteges from './CartPercenteges';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';


const CartContent = () => {
  const { cart, clearCart } = useCartContext();
  return (
    <Wrapper className='section section-center'>
      <CartColumns />
      {cart.map((item, index) => <CartItem key={index} {...item} />)}
      <hr />
      <div className='containerBox'>
        <div className='link-container'>
          <button type='button' className='link-btn clear-btn' onClick={clearCart}>
            Borrar carrito
          </button>
        </div>
      </div>


        
      <CartPercenteges />      
      <CartTotals />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .link-container {
    justify-content: 50%;
  }

  .containerBox {
    display: flex;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;
export default CartContent;
