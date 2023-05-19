import { User } from "@drippple/schema";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";

import {
	logout,
	setAccessToken,
	setUser,
} from "@/store/auth/authSlice";

import store from "@/store";
import axios from "./axios";
import router from "next/router";

export type LoginParams = {
	identifier: string;
	password: string;
};

export type LoginWithGoogleParams = {
	credential: string;
};

export type RegisterParams = {
	name: string;
	email: string;
	username: string;
	password: string;
};

export type AuthDTO = {
	user: User;
	accessToken: string;
};

export type ForgotPasswordParams = {
	email: string;
};

export type ResetPasswordParams = {
	resetToken: string;
	password: string;
};

export type UpdateProfileParams = {
	name: string;
};

export const login = async (loginParams: LoginParams) => {
	const {
		data: { user, accessToken },
	} = await axios.post<
		AuthDTO,
		AxiosResponse<AuthDTO>,
		LoginParams
	>("/auth/login", loginParams);

	// dispatch
	store.dispatch(setUser(user));
	store.dispatch(setAccessToken(accessToken));

	toast.success(
		`Successfully logged in as ${user.username}. Redirecting...`
	);
	setTimeout(() => router.push("/"), 2000);
};

export const loginWithGoogle = async (
	loginWithGoogleParams: LoginWithGoogleParams
) => {
	const {
		data: { user, accessToken },
	} = await axios.post<
		AuthDTO,
		AxiosResponse<AuthDTO>,
		LoginWithGoogleParams
	>("/auth/google", loginWithGoogleParams);
};

export const register = async (
	registerParams: RegisterParams
) => {
	const {
		data: { user, accessToken },
	} = await axios.post<
		AuthDTO,
		AxiosResponse<AuthDTO>,
		RegisterParams
	>("/auth/register", registerParams);

	// dispatch
	store.dispatch(setUser(user));
	store.dispatch(setAccessToken(accessToken));

	toast.success(
		`Successfully registered in as ${user.username}. Redirecting...`
	);
	setTimeout(() => router.push("/"), 2000);
};
