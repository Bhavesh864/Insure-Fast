import {
    LOGGED_USER_DETAILS,
    QUICK_QUOTE_PAYLOAD,
    QUICK_QUOTE_RESULTS,
    RESET_QUICK_QUOTE_PAYLOAD,
    RESET_QUICK_QUOTE_RESULTS,
    RESET_SELECTED_PLAN,
    SELECTED_PLAN,
} from "../types";


const initialState = {
    userDetails: {},
    apiRequestQQ: {
        CustomerType: '',
        InsuredMembers: '',
        DiseaseSuffered: false,
        SurgicalProcedure: false,
        Pincode: '',
        Gender: 'Male',
        FullName: '',
        Email: '',
        MobileNo: '',
        SumInsured: '',
        ChildCount: '',
        SonCount: '',
        DaughterCount: '',
        TenureYear: '1',
        Diseases: [],
        Family: [],
    },
    QuickQouteResult: [],
    selectedPlan: {},
};

const HealthReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEALTH_QUICK_QUOTE_PAYLOAD':
            const { key, value } = action.payload;
            let obj = { ...state.apiRequestQQ };
            if (key.includes(".")) {
                let reqKey = key.split(".");
                obj[reqKey[0]][reqKey[1]] = value;
            } else {
                obj[key] = value;
            }
            return {
                ...state,
                apiRequestQQ: obj,
            };
        default:
            return state;
    }
};
export default HealthReducer;



export function makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
