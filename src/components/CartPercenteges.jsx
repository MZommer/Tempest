import styled from 'styled-components';
import { useCartContext } from '@contexts/CartContext';
import { useTempestContext } from '@contexts/TempestContext';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { range_threshold } from '@utils/constants';


const ProgressBar = ({value, filledValue, text, accept}) => {
    const isOk = accept(value, filledValue)
    const perc = (value/filledValue)*100
    let color = isOk ? 'green' : 'red'
    
    const Wrapper = styled.section`
      /*
      * react-circular-progressbar styles
      * All of the styles in this file are configurable!
      */

      .CircularProgressbar {
        /*
          * This fixes an issue where the CircularProgressbar svg has
          * 0 width inside a "display: flex" container, and thus not visible.
          */
        width: 100%;
        /*
          * This fixes a centering issue with CircularProgressbarWithChildren:
          * https://github.com/kevinsqi/react-circular-progressbar/issues/94
          */
        vertical-align: middle;
      }

      .CircularProgressbar .CircularProgressbar-path {
        stroke: ${color};
        stroke-linecap: round;
        transition: stroke-dashoffset 0.5s ease 0s;
      }

      .CircularProgressbar .CircularProgressbar-trail {
        stroke: #d6d6d6;
        /* Used when trail is not full diameter, i.e. when props.circleRatio is set */
        stroke-linecap: round;
      }

      .CircularProgressbar .CircularProgressbar-text {
        fill: ${color};
        font-size: 20px;
        dominant-baseline: middle;
        text-anchor: middle;
      }

      .CircularProgressbar .CircularProgressbar-background {
      fill: #d6d6d6;
      }

      /*
      * Sample background styles. Use these with e.g.:
      *
      *   <CircularProgressbar
      *     className="CircularProgressbar-inverted"
      *     background
      *     percentage={50}
      *   />
      */
      .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-background {
      fill: #3e98c7;
      }

      .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-text {
      fill: #fff;
      }

      .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-path {
      stroke: #fff;
      }

      .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-trail {
      stroke: transparent;
      }
    `
    return  (
      <Wrapper>
          <div style={{ width: 60, height: 60 }}> 
              <CircularProgressbarWithChildren value={perc}  style={{color}}>
                  {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                  <div style={{ fontSize: 12, textAlign:'center'}}>
                      {text}<br></br><strong style={{color}}> {Math.round(perc)}%</strong> 
                      
                  </div>
              </CircularProgressbarWithChildren>
          </div>
      </Wrapper>
    )
}


const CartPercenteges = () => {
    const {getAmountOfNutrients} = useCartContext();
    const nutrients = getAmountOfNutrients();
    const {CarbRange, ProteinRange, FatRange, IronRange} = useTempestContext();
    return (
      <Wrapper>
        <div>
            
          <article>    
            <h5 style={{ alignItems: 'center' }}>Hidratos de Carbono: 
                <span>
                    <ProgressBar
                        text={nutrients.Carbohydrates.toString()}
                        value={nutrients.Carbohydrates.toNumber()}
                        filledValue={CarbRange}
                        accept={(value, filledValue) => value >= filledValue-range_threshold && value <= filledValue+range_threshold}/>
                </span>
            </h5>
            <h5 style={{ alignItems: 'center' }}>Proteínas: 
                <span>
                    <ProgressBar 
                        text={nutrients.Protein.toString()}
                        value={nutrients.Protein.toNumber()} 
                        filledValue={ProteinRange}
                        accept={(value, filledValue) => value >= filledValue-range_threshold && value <= filledValue+range_threshold}/>
                </span>
            </h5>
            <h5 style={{ alignItems: 'center' }}>Grasas: 
                <span>
                    <ProgressBar 
                        text={nutrients.TotalFat.toString()}
                        value={nutrients.TotalFat.toNumber()} 
                        filledValue={FatRange}
                        accept={(value, filledValue) => value >= filledValue-range_threshold && value <= filledValue+range_threshold}/>
                </span>
            </h5>
            <h5 style={{ alignItems: 'center' }}>Hierro: 
                <span>
                    <ProgressBar 
                        text={nutrients.Iron.toString()}
                        value={nutrients.Iron.toNumber()} 
                        filledValue={IronRange}
                        accept={(value, filledValue) => value >= filledValue}/>
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
    grid-template-columns: 275px 1fr;
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
