import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "./reducers/AppReducer";
import UserReducer from "./reducers/UserReducer";
import MotorReducer from "./reducers/MotorReducer";
import HealthReducer from "./reducers/HealthReducer";




const rootReducer = {
    app: AppReducer,
    user: UserReducer,
    motor: MotorReducer,
    health: HealthReducer,
};


const store = configureStore({
    reducer: rootReducer
});

export default store;