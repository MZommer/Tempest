import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from 'react'
import { useCartContext } from "./CartContext";
import reducer from '@reducers/TempestReducer'
import {
    TEMPEST_CONFIG_BEGIN,
    SET_TEMPEST_CONFIG,
    TEMPEST_CONFIG_ERROR,
    RESET_TEMPEST_STATE,
} from '@actions';
import { TCS_URL } from "@utils/constants";
const getLocalStorage = () => {
    const config = localStorage.getItem('config');
    if (config)
        return JSON.parse(config);
    return {
        configError: false,
        isLoading: false,
        isInitialized: false,
        InitialMoney: 0,
        SpaceID: "UAT",
        EnvID: "DEV",
        Currency: "ARS",
    
    }
}

let initialState = getLocalStorage()

const TempestContext = createContext();

export const TempestProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { setInitialMoney } = useCartContext();

    const getConfig = async SpaceID => {
        dispatch({type: TEMPEST_CONFIG_BEGIN})
        const config = await axios({
            method: "GET",
            baseURL: TCS_URL,
            url: '/v1/config',
            params: {
                SpaceID,
            }
        })  .then(res => res.data)
            .then(config => {
                if (!config.configError){
                    dispatch({ type: SET_TEMPEST_CONFIG, payload: config});
                    setInitialMoney(config.InitialMoney)
                } 
            })
            .catch(err => dispatch({ type: TEMPEST_CONFIG_ERROR}))
            
          
    }

    const resetState = () => {
        dispatch({type:RESET_TEMPEST_STATE})
        localStorage.removeItem("config");
    }

    useEffect(()=>{
        localStorage.setItem("config", JSON.stringify(state))
    }, [state.isInitialized, state.InitialMoney, state.SpaceID, state.EnvID])

    return <TempestContext.Provider value={{...state, getConfig, resetState}}>  {children} </TempestContext.Provider>
}

export const useTempestContext = () => useContext(TempestContext);