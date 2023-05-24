import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppConst, englishLanguageKey } from "../../constants/AppConst";
import { changeuserLanguageUrl } from "../../services/baseUrls";
import { PostRequest } from "../../services/request";
import { CHANGE_APP_LANGUAGE, CHANGE_APP_STATUS, CHANGE_LOADING } from "../types";


//Redux value set

export const ChangeAppStatus = payload => {
    return {
        type: CHANGE_APP_STATUS,
        payload
    }
}


export const ChangeOrientaion = payload => {
    return {
        type: "CHANGE_ORIENTATION",
        payload
    }
}


export const ChangeLoadingSatus = payload => {
    return {
        type: CHANGE_LOADING,
        payload
    }
}

export const ChangeAppLanguage = payload => {
    return {
        type: CHANGE_APP_LANGUAGE,
        payload
    }
}



//Actions

export const AsyncLogin = () => {
    return async dispatch => {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const customerId = await AsyncStorage.getItem("customerid");
        AppConst.showConsoleLog("accessToken", accessToken);
        AppConst.showConsoleLog("customerID : ", customerId)
        if (accessToken) {
            AppConst.accessToken = accessToken //JSON.parse(accessToken);
            AppConst.customerId = JSON.parse(customerId);
            dispatch(ChangeAppStatus(3));
        } else if (!customerId) {
            dispatch(ChangeAppStatus(1));
        } else {
            dispatch(ChangeAppStatus(2));
        }
    }
}