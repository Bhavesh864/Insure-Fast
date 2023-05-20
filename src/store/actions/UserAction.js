import AsyncStorage from "@react-native-async-storage/async-storage";
import { authUrls, motorUrls } from "../../services/baseUrls";
import { GetRequest, PostRequest } from "../../services/request"
import { AppConst } from "../../constants/AppConst";
import { ChangeAppStatus, ChangeLoadingSatus } from "./AppAction";
import { SET_USER_DATA } from "../types";
import { dispatchQuickQuote } from "./PolicyAction";
import store from "..";




export const SetUserData = (payload) => {
    return {
        type: SET_USER_DATA,
        payload
    }
}



export const userLoginAction = async (body) => {
    try {
        const res = await PostRequest({
            url: authUrls.login,
            body,
            loader: true
        });

        return res;
    } catch (error) {

    }
}


export const customerLoginAction = async (body) => {
    try {
        const res = await GetRequest({
            url: authUrls.cutomerLogin + `number=${body.phone}`,
            loader: true
        });

        return res;
    } catch (error) {

    }
}


export const userLogoutAction = () => {
    return async dispatch => {
        store.dispatch(ChangeLoadingSatus(true))
        try {
            // const res = await PostRequest({
            //     url: authUrls.logout,
            //     body,
            //     loader: true
            // });
            AppConst.showConsoleLog("logout action")
            dispatch(ChangeAppStatus(2));

            await AsyncStorage.removeItem("accessToken");
            AppConst.accessToken = null;
            // return res;
            store.dispatch(ChangeLoadingSatus(false))

        } catch (error) {
            AppConst.showConsoleLog("err: ", error)
        }
    }
}


export const verifyOtpAction = async (body, type = "customer") => {
    try {
        const res = await PostRequest({
            url: type == "customer" ? authUrls.customerOtpVerify : authUrls.otpVerify,
            body,
            loader: true
        });
        if (res?.status) {
            await AsyncStorage.setItem("accessToken", JSON.stringify(res.data?.access_token));
            await AsyncStorage.setItem("customerid", JSON.stringify(res.data?.id));
            AppConst.setAccessToken(res.data?.access_token);
            AppConst.setCustomerId(res.data?.id);
        }
        return res;
    } catch (error) {

    }
}

export const AsyncToken = async token => {
    console.log('aysnc token===============', token);
    await AsyncStorage.setItem('accessToken', JSON.stringify(token));
};

export const getUserProfileData = () => {
    return async dispatch => {
        try {
            const res = await GetRequest({
                url: authUrls.customerProfile + "/" + AppConst.customerId
            });
            AppConst.showConsoleLog("profile data: ", res)
            if (res?.status) {
                // console.log('result', res?.data);
                dispatchQuickQuote("FirstName", res?.data?.first_name);
                dispatchQuickQuote("LastName", res?.data?.last_name);
                dispatchQuickQuote("Email", res?.data?.email);
                dispatchQuickQuote("Dob", res?.data?.dob);
                dispatchQuickQuote("MobileNumber", res?.data?.phone);
                AppConst.setAccessToken(res?.data?.access_token);
                dispatch(SetUserData(res?.data));
            }
        } catch (error) {

        }
    }
}