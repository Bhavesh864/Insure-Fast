import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "..";
import { AppConst } from "../../constants/AppConst";
import { motorUrls } from "../../services/baseUrls"
import { FormDataAuthApiHeader, GetRequest, PostRequest } from "../../services/request"
import { QUICK_QUOTE_PAYLOAD } from "../types";
import { ChangeLoadingSatus } from "./AppAction";
import { AppToastMessage } from "../../components/custom/SnackBar";




export const quickQuotePayload = (payload) => {
    return {
        type: QUICK_QUOTE_PAYLOAD,
        payload,
    };
};

export const dispatchQuickQuote = (key, value) => {
    let obj = {
        key: key,
        value: value,
    };
    store.dispatch(quickQuotePayload(obj));
};



export const getMotorMakeAction = async (Vehicle_Type = "Pvt Car") => {
    // console.log('start');
    try {
        const res = await PostRequest({
            url: motorUrls.make,
            body: {
                Vehicle_Type
            },
            loader: true
        });
        // AppConst.showConsoleLog("res:", res);
        // console.log('end');

        return res
    } catch (error) {

    }
}

export const getMotorMakeSearchAction = async (search = "", Vehicle_Type = "Pvt Car") => {
    try {
        const res = await PostRequest({
            url: motorUrls.makeSearch,
            body: {
                Vehicle_Type,
                make: search
            },
            loader: true
        });
        // AppConst.showConsoleLog("res:", res);
        return res
    } catch (error) {

    }
}


export const getMotorModelAction = async (body, isSearch = false) => {
    try {
        const res = await PostRequest({
            url: isSearch ? motorUrls.modelSearch : motorUrls.model,
            body: body,
            loader: true
        });
        return res
    } catch (error) {

    }
}


export const getMotorVariantAction = async (body, isSearch = false) => {
    try {
        const res = await PostRequest({
            url: isSearch ? motorUrls.variantSearch : motorUrls.variant,
            body: body,
            loader: true
        });
        return res
    } catch (error) {

    }
}


export const getAllRtoCodesAction = async () => {
    try {
        const res = await GetRequest({
            url: motorUrls.rto,
        });
        return res;
    } catch (error) {

    }
}


export const createCustomerAction = async (formData) => {
    const token = await AsyncStorage.getItem('accessToken');
    // console.log('access', AppConst.accessToken);
    // 'Authorization': `Bearer ${AppConst.accessToken}`,
    try {
        const res = await PostRequest({
            header: {
                ...FormDataAuthApiHeader,
                'Authorization': `Bearer null`,
            },
            url: motorUrls.createCustomer,
            body: formData,
            loader: true,
            fileupload: true
        });

        return res
    } catch (error) {
        console.log(error);
    }
}

export const claimRequest = async (formData) => {
    console.log('formData==> ', AppConst.accessToken);

    try {
        const res = await PostRequest({
            header: {
                ...FormDataAuthApiHeader,
                'Authorization': `Bearer ${AppConst.accessToken}`
            },
            url: motorUrls.claimRequest,
            body: formData,
            loader: true,
            fileupload: true
        });

        return res
    } catch (error) {
        console.log(error);
    }
}


export const getAllClaimOfCustomer = async (customerId) => {
    try {
        const res = await GetRequest({
            url: motorUrls.getAllClaims + `${customerId}`,
            loader: true
        });
        return res;
    } catch (error) {
        console.log(error);
    }

}

export const getPunchedPoliciesData = async () => {
    const customerId = await AsyncStorage.getItem("customerid");
    try {
        const res = await GetRequest({
            url: motorUrls.getPunchedPoliciesData + `${customerId}`,
            loader: true
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}


export const getAllocatedMentor = async () => {
    const customerId = await AsyncStorage.getItem("customerid");
    try {
        const res = await GetRequest({
            url: motorUrls.getAllocatedMentor + `${customerId}`,
            loader: true
        },
        );
        return res;
    } catch (error) {
        console.log(error);
    }
}


export const getRecentSearchedQuote = async () => {
    const customerId = await AsyncStorage.getItem("customerid");
    try {
        const res = await GetRequest({
            url: motorUrls.getRecentQuoteUrl + `${customerId}`,
            loader: true
        },
        );
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const getCountryWithCountryCode = async (countryCode = '') => {

    try {
        const res = await GetRequest({
            url: motorUrls.getCountryDataWithCode + `Pin_Code=${countryCode}`,
            loader: true
        },
        );
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const submitAppRating = async (rating = 0) => {
    const customerId = await AsyncStorage.getItem("customerid");
    try {
        const res = await PostRequest({
            url: motorUrls.submitRating,
            body: {
                rating,
                id: customerId
            },
            loader: true
        });
        // AppConst.showConsoleLog("res:", res);
        return res
    } catch (error) {
    }
}


export const sendQuotation = async (email = '') => {
    try {
        store.dispatch(ChangeLoadingSatus(true));
        const res = await fetch("https://api.insurefast.in/api/v1/admin/send-quotation", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AppConst.accessToken}`
            },
            body: JSON.stringify({
                email
            })
        }).then((response) => response.text())
            .then((responseData) => {
                // console.log(
                //     "POST Response",
                //     "Response Body -> " + responseData
                // )
                return responseData;
            })
        store.dispatch(ChangeLoadingSatus(false));
        if (email != '') {
            AppToastMessage('Quotation send to your email successfully!')
        }
        // AppConst.showConsoleLog("res:", res);
        return res;
    } catch (error) {
        store.dispatch(ChangeLoadingSatus(false));
        AppToastMessage('Something went wrong!');
        console.log(error);
    }
}





export const fillPolicyDataAction = async (formData) => {
    console.log('form', formData);
    try {
        const res = await PostRequest({
            url: motorUrls.fillPolicyData,
            body: formData,
            fileupload: true,
            loader: true
        });
        return res;
    } catch (error) {

    }
}



export const createOnlinePolicyObj = (body) => {
    // console.log('body--> ', body);
    let obj = {
        ...(body?.RegistrationNumber && { vehicle_no: body?.RegistrationNumber }),
        // ...(body?.RegistrationYear && { vehicle_mfg_yr: body?.RegistrationYear }),
        ...(body?.ManufaturingDate && { vehicle_mfg_yr: body?.ManufaturingDate }),
        ...(body?.RegistrationDate && { registration_date: body?.RegistrationDate }),
        ...(body?.FuelType && { fuel_type: body?.FuelType }),
        // ...(body?.VehicleType && {
        //     vehicle_type:
        //         body?.VehicleType === "2w"
        //             ? "MotorBike"
        //             : body?.VehicleType === "4w"
        //                 ? "Pvt Car"
        //                 : body?.VehicleType === "gcv"
        //                     ? "Goods Carrying"
        //                     : body?.VehicleType === "pcv" && "Passenger Carrying",
        // }),
        ...(body?.VehicleType && { vehicle_type: body?.VehicleType }),
        ...(body?.MakeName && { vehicle_make: body?.MakeName }),
        ...(body?.ModelName && { vehicle_model: body?.ModelName }),
        ...(body?.VariantName && { vehicle_variant: body?.VariantName }),
        ...(body?.rm_name_Code && { rm_name_Code: body?.rm_name_Code }),
        ...(body?.NewPolicyType && {
            policy_type:
                body?.NewPolicyType === "Comprehensive"
                    ? "comprehensive"
                    : body?.NewPolicyType == "ThirdParty"
                        ? "third_party"
                        : "own_damage",
        }),
        ...(body?.gaskit_installed && { gaskit_installed: body?.gaskit_installed }),
        policy_status: body?.PolicyStatus,
        ...(body?.PrePolicyEndDate && { PrePolicyEndDate: body?.PrePolicyEndDate }),
        ...(body?.required_add_on && { required_add_on: body?.required_add_on }),
        ...(body.Api_name && { insurance_company: body.Api_name }),
        ...(body.ApiId && { policy_no: body.ApiId }),
        ...(body?.idv && { require_idv: body?.idv }),
        ...(body?.require_discount && { require_discount: body?.require_discount }),
        ...(body?.expected_final_premium && { expected_final_premium: body?.expected_final_premium }),
        ...(body?.policyIdDb && { policyId: body?.policyIdDb }),
        ...(body?.PolicyStartDate && { policy_starts: body?.PolicyStartDate }),
        ...(body?.PolicyEndDate && { policy_expires: body?.PolicyEndDate }),
        ...(body?.PolicyStartDate && { policy_issue: body?.PolicyStartDate }),
        ...(body?.PolicyStartDate && { policy_recieve: body?.PolicyStartDate }),
        ...(body?.BasicODPremium && { od_net_premium: body?.BasicODPremium }),
        ...(body?.terrorism_premium && { terrorism_premium: body?.terrorism_premium }),
        ...(body?.NetPremium && { tax_amount: body?.GST }),
        ...(body?.NetPremium && { net_premium: body?.NetPremium }),
        ...(body?.EngineNumber && { engine_no: body?.EngineNumber }),
        ...(body?.ChassisNumber && { chassis_no: body?.ChassisNumber }),
        ...(body?.FinalPremium && { gross_premium: body?.FinalPremium }),
        ...(body?.file && { file: body?.file }),
        ...(body?.file_type && { file_type: body?.file_type }),
        case_type: body.IsVehicleNew === true ? "new" : "rollover",
    };
    const newObj = new Object();
    for (let key in obj) {
        if (obj[key] !== null && obj[key] !== undefined) {
            newObj[key] = obj[key];
        }
    }
    // console.log("newObj-->  ", newObj)
    return newObj;
};


export const getPreviousPolicyCompanies = async () => {
    try {
        const res = await GetRequest({
            url: motorUrls.previousPolicy
        });
        return res
    } catch (error) {

    }
}