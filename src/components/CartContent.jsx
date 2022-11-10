import styled from 'styled-components';
import { useCartContext } from '@contexts/CartContext';
import CartColumns from './CartColumns';
import CartItem from './CartItem.jsx';
import CartTotals from './CartTotals';

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
        <div style={{ width: 70, height: 70, marginTop:4, marginLeft:20 }}>
          <CircularProgressbarWithChildren value={66}>
            {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
            <div style={{ fontSize: 12, marginTop: -2 , textAlign:'center'}}>
            HC <br/>
              <strong style={{color: '#005227'}}>66%</strong> 
            </div>
          </CircularProgressbarWithChildren>
        </div>
        <div style={{ width: 70, height: 70, marginTop:4, marginLeft:3 }}>
          <CircularProgressbarWithChildren value={100}>
            {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
            <div style={{ fontSize: 12, marginTop: -2, textAlign:'center'}}>
            Proteínas <br/>
              <strong style={{color: '#005227'}}>100%</strong> 
            </div>
          </CircularProgressbarWithChildren>
        </div>
        <div style={{ width: 70, height: 70, marginTop:4, marginLeft:3 }}>
          <CircularProgressbarWithChildren value={80}>
            {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
            <div style={{ fontSize: 12, marginTop: -2, textAlign:'center'}}>
            Grasas <br/>
              <strong style={{color: '#005227'}}>80%</strong> 
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>
      
      <CartTotals />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .link-container {
    justify-content: 5%;
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
