import {
    TEMPEST_CONFIG_BEGIN,
    SET_TEMPEST_CONFIG,
    TEMPEST_CONFIG_ERROR,
    RESET_TEMPEST_STATE,
    SET_RANGES,
} from '@actions';

export default function TempestReducer (state, action) {
    
    switch(action.type) {
        case RESET_TEMPEST_STATE:
            return {}
        case SET_TEMPEST_CONFIG:
            return {...state, ...action.payload, isInitialized: true, isLoading: false}
        case TEMPEST_CONFIG_BEGIN:
            return {...state, isLoading: true}
        case TEMPEST_CONFIG_ERROR:
            return {...state, configError: true, isLoading: false}
        case SET_RANGES:
            return {...state, ...action.payload}
        default:
            throw new Error(`No Matching "${action.type}" - action type`)
    }
}