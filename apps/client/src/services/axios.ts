import store from "@/store";
import { logout } from "@/store/auth/authSlice";
import env from "@beam-australia/react-env";
import _axios, { AxiosError } from "axios";
import { error } from "console";
import router from "next/router";
import { toast } from "react-hot-toast";

// logout here
// store here

export type ServerError = {
	path: string;
	message: string;
	timestamp: string;
	statusCode: number;
};

const baseURL =
	process.env.NEXT_PUBLIC_SERVER_URL || "/api";
const axios = _axios.create({ baseURL });

axios.interceptors.request.use((config) => {
	const { accessToken } = store.getState().auth;
	config.headers.set(
		"Authorization",
		`Bearer ${accessToken}`
	);

	return config;
});

axios.interceptors.response.use(
	(response) => response,
	(error: AxiosError<ServerError>) => {
		const { response } = error;

		if (response) {
			const errorObject = response.data;
			const code = errorObject.statusCode;
			const message = errorObject.message;

			toast.error(message);

			if (code === 401) {
				// dispatch logout
				store.dispatch(logout());
				router.push("/session/new");
			}

			throw errorObject;
		}

		throw error;
	}
);

export default axios;
