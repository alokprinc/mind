import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import affirmationsReducer from "./reducers/affirmationsReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    affirmations: affirmationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
