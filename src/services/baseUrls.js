
// local
const dnsUrl = "/api/v1"
// export const baseUrl = "https://76bc-2401-4900-1c1a-a0d-1c48-c2f4-8286-b7a4.ngrok.io" + dnsUrl;
// production
const devUrl = "https://af21-2401-4900-1c1b-af62-2531-aa6-f39d-fe4c.ngrok.io";
export const liveUrl = "https://api.insurefast.in" //"http://142.93.234.216:10111"
export const baseUrl = liveUrl + dnsUrl;



export const authUrls = {
    login: "/auth/login",
    otpVerify: "/auth/otp-verification",
    cutomerLogin: "/auth/customer-login",
    customerOtpVerify: "/auth/verify-otp", //"/auth/otp-verification-customer",
    customerProfile: "/auth/customer-data"
}

export const motorUrls = {
    make: "/motor/make",
    makeSearch: "/motor/make-search",
    model: "/motor/model",
    modelSearch: "/motor/model-search",
    variant: "/motor/variant",
    variantSearch: "/motor/variant-search",
    rto: "/motor/rto",
    pincode: "/motor/pincode",
    fillPolicyData: "/motor/fill-policy-data",
    createCustomer: "/motor/create-customer",
    getUserData: "/motor/detail",
    previousPolicy: "/motor/previous-insurer",
    claimRequest: "/claim/request-claim",
    getAllClaims: "/claim/all-claims/",
    getPunchedPoliciesData: "/motor/policies/",
    getAllocatedMentor: "/motor/allocated-mentor/",
    getRecentQuoteUrl: "/motor/recent-policies/",
    submitRating: "/auth/rate-us",
    submitQuotaionUrl: '/admin/send-quotation'
}