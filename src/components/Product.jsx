import React from 'react'
import swal from 'sweetalert'
import styled from 'styled-components'
import { formatPrice } from '@utils/helpers'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Product = ({Thumb, Name, Price, ID, Brand}) => {
  const openQRModal = () => {
    const url = window.location.href + "/" + ID
    swal({
      title: Name,
      button: "👍",
      icon: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + url,
    })
  }
  return <Wrapper>
    <div className="container">
      <img src={Thumb} alt={Name} />
      
      <Link to={`/products/${ID}`} className="link">
        <FaSearch />
      </Link>
      <button type='button' onClick={openQRModal}>
        <i className="fa fa-qrcode" aria-hidden="true" ></i>
      </button> 
    </div>

    <footer>
      <h5>{Name}</h5>
      <p>{Brand}</p>
      <p>{formatPrice(Price)}</p>
          
    </footer>
  </Wrapper>
}

const Wrapper = styled.article`
  .container {
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
  }
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }

  button{
    position: absolute; 
    left: calc(100px/2 - 40px);
    top: calc(300px/2 - 10px);
   
  }
`
export default Product
