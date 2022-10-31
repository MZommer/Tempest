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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error type='single-product' />;
  }
  console.log("Product: ")
  console.log(product)
  const { Name, Brand, Price, Description, Thumb, Cover, NutritionalTable} = product;
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
            <p className='desc'>{Description}</p>
            <p className='info'>
              <span>Availability : </span>
              {stock > 0 ? `In Stock (${stock})` : 'out of stock'}
            </p>

            <p className='info'>
              <span>SKU : </span>
              {sku}
            </p>

            <p className='info'>
              <span>Brand : </span>
              {company}
            </p>
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
`;

export default SingleProductPage;
