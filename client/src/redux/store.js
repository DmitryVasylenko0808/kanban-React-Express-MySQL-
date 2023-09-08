import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import formsReducer from "./slices/formsSlice";
import userReducer from "./slices/userSlice";

export default configureStore({
    reducer: {
        theme: themeReducer,
        forms: formsReducer,
        user: userReducer
    }
}); 