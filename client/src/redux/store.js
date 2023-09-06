import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import formsReducer from "./slices/formsSlice";

export default configureStore({
    reducer: {
        theme: themeReducer,
        forms: formsReducer
    }
}); 