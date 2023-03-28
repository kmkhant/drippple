import env from "@beam-australia/react-env";
import {
	CredentialResponse,
	GoogleLogin,
} from "@react-oauth/google";
import React from "react";

const handleLoginWithGoogle = async (
	response: CredentialResponse
) => {
	if (response.credential) {
		console.log(response.credential);
	}
};

const GoogleLoginButton = () => {
	return <GoogleLogin onSuccess={handleLoginWithGoogle} />;
};

export default GoogleLoginButton;
