import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsContext } from '@contexts/ProductsContext';
import { formatPrice } from '@utils/helpers';
import Error from '@components/Error';
import Loading from '@components/Loading';
import PageHero from '@components/PageHero';
import ProductImages from '@components/ProductImages';
import styled from 'styled-components';
import AddToCart from '@components/AddToCart';




const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { single_product_loading: loading, single_product_error: error, single_product: product, fetchSingleProduct } = useProductsContext();
  const { Name, Brand, Price, Description, Thumb, Cover, NutritionalTable} = product;

  useEffect(() => {
    fetchSingleProduct(id);
    // eslint-disable-next-line
  }, [id]);

  if (loading || !NutritionalTable || error) {
    return <Loading />;
  }

  if (error) {
    return <Error type='single-product' />;
  }

  return (
    <Wrapper>
      <PageHero title={product.Name} product />
      <div className='section section-center page'>
        <div className='product-center'>
          <ProductImages images={[Thumb, Cover]} />
          <section className='content'>
            <h2>{Name}</h2>
            <h5 style={{opacity: 0.5}}>{Brand}</h5>
            <h5 style={{opacity: 0.7}}>{Description}</h5>
            <h5 className='price'>{formatPrice(Price)}</h5>
            <hr/> 


            <div>
              <article>
                <h3>Composicion Centecimal</h3>
                <h5 style={{opacity: 0.7}}>Valores por 100g</h5>
                <hr/>
                <p>
                  Hidratos de Carbono :  {NutritionalTable.Carbohydrates}
                </p>
                <p>
                  Proteìnas: {NutritionalTable.Protein} 
                </p>
                <p>
                  Grasas:   {NutritionalTable.TotalFat}
                </p>
                <p>
                  Fibra:   {NutritionalTable.Fiber}
                </p>
                <p>
                  Sodio:  {NutritionalTable.Sodium}
                </p>
                <p>
                  Calcio:   {NutritionalTable.Calcium}
                </p>
                <p>
                  Hierro:   {NutritionalTable.Iron}
                </p>
              </article>
            </div>

            <AddToCart product={product} />
            
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }

  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }

  hr{
    margin-bottom:1.5rem;
  }
  
`;

export default SingleProductPage;
