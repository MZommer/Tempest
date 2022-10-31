import {
    SET_TEMPEST_CONFIG,
} from '@actions'

export default function TempestReducer (state, action) {

    switch(action.type) {
        case SET_TEMPEST_CONFIG:
            return {...state, ...action.payload, isInitialized: true}
    }
}