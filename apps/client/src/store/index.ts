import {
	combineReducers,
	configureStore,
} from "@reduxjs/toolkit";
import {
	persistReducer,
	persistStore,
} from "redux-persist";

// import reducers

// saga and storage
import storage from "./storage";

// declare reducers
import authReducer from "./auth/authSlice";

const reducers = combineReducers({
	auth: authReducer,
});

const persistedReducers = persistReducer(
	{
		key: "root",
		storage,
		whitelist: ["auth"],
	},
	reducers
);

// const persistedReducer = persistReducer(
// 	{ key: "root", storage, whitelist: ["auth"] },
// 	reducers
// );

const store = configureStore({
	reducer: persistedReducers,
	devTools: process.env.NODE_ENV !== "production",
	middleware: [],
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
