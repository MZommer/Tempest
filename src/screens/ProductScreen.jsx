import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsContext } from '@contexts/ProductsContext';
import { formatPrice } from '@utils/helpers';
import Error from '@components/Error';
import Loading from '@components/Loading';
import PageHero from '@components/PageHero';
import ProductImages from '@components/ProductImages';
import styled from 'styled-components';

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { single_product_loading: loading, single_product_error: error, single_product: product, fetchSingleProduct } = useProductsContext();
  const { Name, Brand, Price, Description, Thumb, Cover, NutritionalTable} = product;
  
  useEffect(() => {
    fetchSingleProduct(id);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]);

  if (loading || !NutritionalTable) {
    return <Loading />;
  }

  if (error) {
    return <Error type='single-product' />;
  }


  console.log("Product: ")
  console.log(product.NutritionalTable)
  let stock, sku, company;

  return (
    <Wrapper>
      <PageHero title={product.Name} product />
      <div className='section section-center page'>
        <div className='product-center'>
          <ProductImages images={[Thumb, Cover]} />
          <section className='content'>
            <h2>{Name}</h2>
            <h5 style={{opacity: 0.5}}>{Brand}</h5>
            <h5 className='price'>{formatPrice(Price)}</h5>
            <hr/><br></br>

            <p className='info'> 
              <span>Tabla nutricional: </span>
            </p>

            <div>
              <article>
                <h5>
                  HC :  {NutritionalTable.Carbohydrates} <span><i className="fa fa-check-circle" aria-hidden="true" height="10 px"></i></span>
                </h5>
                <h5>
                  PROTEINAS: {NutritionalTable.Protein} <span><i className="fa fa-check-circle" aria-hidden="true" height="10 px"></i></span>
                </h5>
                <h5>
                  GRASAS:   {NutritionalTable.Carbohydrates}<span><i className="fa fa-check-circle" aria-hidden="true" height="10 px"></i></span>
                </h5>
                <h5>
                  FIBRA:   {NutritionalTable.Fiber}<span><i className="fa fa-check-circle" aria-hidden="true" height="10 px"></i></span>
                </h5>
                <h5>
                  SODIO:  {NutritionalTable.Sodium} <span><i className="fa fa-check-circle" aria-hidden="true" height="10 px"></i></span>
                </h5>
                <h5>
                  CALCIO:   {NutritionalTable.Calcium}<span><i className="fa fa-check-circle" aria-hidden="true" height="10 px"></i></span>
                </h5>
                <h5>
                  HIERRO:   {NutritionalTable.Iron}<span><i className="fa fa-check-circle" aria-hidden="true" height="10 px"></i></span>
                </h5>
              </article>
            </div>
            <hr />
             {/* <AddToCart product={product} /> */}
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
  
`;

export default SingleProductPage;
