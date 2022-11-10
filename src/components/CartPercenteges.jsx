import styled from 'styled-components';
import { useCartContext } from '@contexts/CartContext';
import { formatPrice } from '@utils/helpers';
import { Link } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
const ProgressBar = ({value, filledValue, text}) => {
    const perc = (value/filledValue)*100
    let color = perc >= 60 ? 'yellow' : 'red'
    color = perc >= 100 ? 'green' : color
    return  (
        <div style={{ width: 60, height: 60 }}>
            <CircularProgressbarWithChildren value={perc}>
                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                <div style={{ fontSize: 12, textAlign:'center'}}>
                    {text}<br></br><strong style={{color: '#005227'}}> {Math.round(perc)}%</strong> 
                    
                </div>
            </CircularProgressbarWithChildren>
        </div>
    )
}


const CartPercenteges = () => {
    const {getAmountOfNutrients} = useCartContext();
    const nutrients = getAmountOfNutrients();

    return (
      <Wrapper>
        <div>
            
          <article>    
            <h5 style={{ alignItems: 'center' }}>Hidratos de Carbono: 
                <span>
                    <ProgressBar 
                        text={nutrients.Carbohydrates.toString()}
                        value={nutrients.Carbohydrates.toNumber()} 
                        filledValue={275}/>
                </span>
            </h5>
            <h5 style={{ alignItems: 'center' }}>Proteínas: 
                <span>
                    <ProgressBar 
                        text={nutrients.Protein.toString()}
                        value={nutrients.Protein.toNumber()} 
                        filledValue={75}/>
                </span>
            </h5>
            <h5 style={{ alignItems: 'center' }}>Grasas: 
                <span>
                    <ProgressBar 
                        text={nutrients.TotalFat.toString()}
                        value={nutrients.TotalFat.toNumber()} 
                        filledValue={66.67}/>
                </span>
            </h5>
            <h5 style={{ alignItems: 'center' }}>Hierro: 
                <span>
                    <ProgressBar 
                        text={nutrients.Iron.toString()}
                        value={nutrients.Iron.toNumber()} 
                        filledValue={15}/>
                </span>
            </h5>
          </article>
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
    padding: 1.5rem 0.8rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 260px 1fr;
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

export default CartPercenteges;
