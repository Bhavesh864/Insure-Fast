import { CHANGE_APP_LANGUAGE, CHANGE_APP_STATUS, CHANGE_LOADING } from "../types";



const initialState = {
    appStatus: 0,
    loading: false,
    orientation: "LANDSCAPE",
    appLanguage: "EN"       //EN, AR
}

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_APP_STATUS:
            return { ...state, appStatus: action.payload }
        case "CHANGE_ORIENTATION":
            return { ...state, orientation: action.payload }
        case CHANGE_LOADING:
            return { ...state, loading: action.payload }
        case CHANGE_APP_LANGUAGE:
            return { ...state, appLanguage: action.payload }
        default:
            return state;
    }
}



export default AppReducer;