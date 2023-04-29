import { AppConst } from "../../constants/AppConst";
import { SET_ACTIVE_USER_TYPE, SET_APP_SETTINGS, SET_CART_ITEMS, SET_CHAT_DATA, SET_FAVOURITES_DATA, SET_FOLLOWING_DATA, SET_MY_REVIEWS, SET_PRODUCTS_WISHLIST, SET_USER_DATA, UPDATE_CHAT_DATA } from "../types";


const initialState = {
    user: null,
    followings: [],
    favourites: [],
    activeUserType: "user",
    chatData: [],
    myReviews: null,
    cartItems: null,
    productsWishlist: [],
    settings: null
}



const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                user: action.payload
            }
        case SET_ACTIVE_USER_TYPE:
            return {
                ...state,
                activeUserType: action.payload
            }
        case SET_FOLLOWING_DATA:
            return {
                ...state,
                followings: action.payload
            }
        case SET_FAVOURITES_DATA:
            return {
                ...state,
                favourites: action.payload
            }
        case SET_CHAT_DATA:
            return { ...state, chatData: action.payload }
        case UPDATE_CHAT_DATA:
            return { ...state, chatData: [action.payload, ...state.chatData] }
        case "UPDATE_FAV_DATA":
            return { ...state, favourites: [action.payload, ...state.favourites] }
        case SET_MY_REVIEWS:
            return { ...state, myReviews: action.payload }
        case SET_CART_ITEMS:
            return { ...state, cartItems: action.payload }
        case SET_PRODUCTS_WISHLIST:
            return { ...state, productsWishlist: action.payload }
        case SET_APP_SETTINGS:
            return { ...state, settings: action.payload }
        default:
            return state
    }
}


export default UserReducer;