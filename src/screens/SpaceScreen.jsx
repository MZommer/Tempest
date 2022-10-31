import { useState } from 'react'
import styled from 'styled-components';
import Loading from '@components/Loading';
import { useTempestContext } from "@contexts/TempestContext";

export default function SpaceScreen() {
    const {isLoading, isInitialized, configError, getConfig, resetState} = useTempestContext();
    const [space, setSpace] = useState("");

    // if (isInitialized) // TODO: Add Redirect to opened page
    //     window.location = "/"

    if (configError){
        setInterval(()=> {
            resetState()
            window.location = "/setSpace"
        }, 3000)
        return (
            <div className="section section-center text-center">
                <h2>Error! Espacio Invalido!</h2>
            </div>
        )
    }
    if (isLoading) {
        return <Loading />;
    }

    return (
        <Wrapper className='page-100'>
            <div className='empty'>
                <h2>Escriba su espacio</h2>
                <input type="text" onChange={event => setSpace(event.target.value)}/>
                <button onClick={() => getConfig(space)} className="btn">Enviar</button>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
    }
  }
`;