import store from "..";
import { AppConst } from "../../constants/AppConst";
import { healthUrls } from "../../services/baseUrls";
import { PostRequest } from "../../services/request";

export const quickQuotePayload = (payload) => {
    return {
        type: 'HEALTH_QUICK_QUOTE_PAYLOAD',
        payload,
    };
};

export const dispatchHealthQuickQuote = (key, value) => {
    let obj = {
        key: key,
        value: value,
    };
    store.dispatch(quickQuotePayload(obj));
};


export const submitHealthPolicyAction = async (body) => {
    console.log('form', body);
    try {
        const res = await PostRequest({
            url: healthUrls.submitHealthPolicy,
            body: body,
            loader: true
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}