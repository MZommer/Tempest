import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from 'react'
import reducer from '@reducers/TempestReducer'
import {
    SET_TEMPEST_CONFIG,
} from '@actions';
import { TCS_URL } from "@utils/constants";
const getLocalStorage = () => {
    const config = localStorage.getItem('config');
    if (config)
        return JSON.parse(config);
}

let initialState = {
    configError: false,
    isLoading: true,
    isInitialized: false,
    initialMoney: 0,
    SpaceID: "UAT",
    EnvID: "DEV",
    Currency: "ARS",

}

const TempestContext = createContext();

export const TempestProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);


    const getConfig = async SpaceID => {
        const config = await axios({
            method: "GET",
            baseURL: TCS_URL,
            url: '/v1/config',
            params: {
                SpaceID,
            }
        }).then(res => res.data)
        dispatch({ type: SET_TEMPEST_CONFIG, payload: config});
    }


    return <TempestContext.Provider value={{...state, getConfig}}>  {children} </TempestContext.Provider>
}

export const useTempestContext = () => useContext(TempestContext);