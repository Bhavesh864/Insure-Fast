import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "./reducers/AppReducer";
import UserReducer from "./reducers/UserReducer";
import MotorReducer from "./reducers/MotorReducer";






const rootReducer = {
    app: AppReducer,
    user: UserReducer,
    motor: MotorReducer
};



const store = configureStore({
    reducer: rootReducer
});

export default store;