import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import styled from 'styled-components';
import Loading from '@components/Loading';
import { useTempestContext } from "@contexts/TempestContext";
import { useNavigate } from "react-router-dom";

export default function SpaceScreen() {
    const navigate = useNavigate();
    const { isLoading, isInitialized, configError, getConfig, resetState } = useTempestContext();
    const [space, setSpace] = useState("");

    if (isLoading) {
        return <Loading />;
    }

    if (configError) {
        toast.error("Grupo invalido!")
        setInterval(() => {
            resetState()
            navigate(0)
        }, 3000)
        return (
            <div className="section section-center text-center">
                <h2>Error! Espacio Invalido!</h2>
            </div>
        )
    }
    if (isInitialized) {
        toast.success("Grupo valido!")
        navigate(0)
    }
    return (
        <Wrapper className='page-100'>
            <div className='empty'>
                <h1>Escriba su grupo</h1>
                <form onSubmit={event=> { 
                    event.preventDefault();
                    getConfig(space)
                }}>
                    <div className='form-control'>
                        <input type='text' onChange={event => setSpace(event.target.value)} name='text' placeholder='Ingrese su grupo' className='search-input' />
                    </div>
                    <button type="submit" className="btn">Enviar</button>
                </form>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h1 {
      margin-bottom: 2rem;
    }

    .form-control {
        margin-bottom: 1.25rem;
        h5 {
          margin-bottom: 0.5rem;
        }
      }
      .search-input {
        padding: 0.5rem;
        background: var(--clr-grey-10);
        border-radius: var(--radius);
        border-color: transparent;
        letter-spacing: var(--spacing);
      }
  }
`;