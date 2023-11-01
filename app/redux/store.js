import {legacy_createStore as createStore} from 'redux'

const CHANGE_URL = 'CHANGE_URL'
const UPDATE_ELAPSED = 'UPDATE_ELAPSED'
const UPDATE_API_DATA = 'UPDATE_API_DATA'
const PLAYER_STATUS = 'PLAYER_STATUS'
const AUDIO_CTRL = 'AUDIO_CTRL'
const SAVE_NOWPLAYING = 'SAVE_NOWPLAYING'
const CHANGE_COLOR_SCHEME = 'CHANGE_COLOR_SCHEME'
const GET_SOURCE_CAPABILITY = 'GET_SOURCE_CAPABILITY'

const initData = {
    mode: 'dark',

    radioPlaying: [],

    audioCapability: [],
    currentRadioId: 0,
    playerElapsed: '00:00:00',
    playerStatus: 'ready',
    infoFromAPI: [],
    listenedSong: [],
    audioCmd: ''
}
export const updateCapability = (audioCapability) => ({
    type: GET_SOURCE_CAPABILITY,
    data: audioCapability
})
export const playRadio = (radioPlaying) => ({
    type: CHANGE_URL,
    data: radioPlaying,
})
export const changeColorScheme = (mode) => ({
    type: CHANGE_COLOR_SCHEME,
    data: mode,
})
export const updatePlayerStats = (playerStatus) => ({
    type: PLAYER_STATUS,
    data: playerStatus
})
export const saveNowPlaying = (listenedSong) => ({
    type: SAVE_NOWPLAYING,
    data: listenedSong
})
export const remoteCmd = (audioCmd) => ({
    type: AUDIO_CTRL,
    data: audioCmd,
})
export const playingDuration = (playerElapsed) => ({
    type: UPDATE_ELAPSED,
    data: playerElapsed,
})
export const playingData = (infoFromAPI) => ({
    type: UPDATE_API_DATA,
    data: infoFromAPI,
})

export const reducer = (state = initData, action) => {
    switch(action.type) {
        case CHANGE_URL:
            state.infoFromAPI = []
            state.currentRadioId = action.data.id
            return {...state, radioPlaying: action.data}
        case PLAYER_STATUS:
            return {...state, playerStatus: action.data}
        case UPDATE_ELAPSED:
            return {...state, playerElapsed: action.data}
        case UPDATE_API_DATA:
            return {...state, infoFromAPI: action.data}
        case SAVE_NOWPLAYING: 
            return {...state, listenedSong: action.data}
        case AUDIO_CTRL:
            return {...state, audioCmd: action.data}
        case CHANGE_COLOR_SCHEME:
            console.log(action.data)
            return {...state, mode: action.data}
        case GET_SOURCE_CAPABILITY: 
            return {...state, audioCapability: action.data}
        default: return state;
    }
}

const storeState = createStore(reducer);
export default storeState;