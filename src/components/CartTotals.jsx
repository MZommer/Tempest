import styled from 'styled-components';
import { useCartContext } from '@contexts/CartContext';
import { formatPrice } from '@utils/helpers';
import { Link } from 'react-router-dom';

const TotalItem = ({Name, amount, Price}) =>{
  return (
    <p> {Name} ({amount}): <span>{formatPrice(Price*amount)}</span> </p>
  )
}

const CartTotals = () => {
  const { getTotalPrice, cart } = useCartContext();

  return (
    <Wrapper>
      <div>
        <article>           
          {cart.map((item, index) => <TotalItem key={index} {...item}/>)}
          <hr />
          <h4>
            Precio total : <span>{formatPrice(getTotalPrice())}</span>
          </h4>
        </article>
        <Link to='/checkout' className='btn'>
          Comprar
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 1.2rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 250px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
