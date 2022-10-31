import { useState } from 'react'
import styled from 'styled-components';
import { useTempestContext } from "@contexts/TempestContext";

export default function SpaceScreen() {
    const {configError, getConfig} = useTempestContext();
    const [space, setSpace] = useState();

    if (configError)
        return (
            <div className="section section-center text-center">
                <h2>Error! Espacio Invalido!</h2>
            </div>
        )

    return (
        <Wrapper className='page-100'>
            <div className='empty'>
                <h2>Escriba su espacio</h2>
                <input type="text" onChange={setSpace}/>
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