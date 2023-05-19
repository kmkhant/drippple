import React from "react";
import Image from "next/image";
import Link from "next/link";
import Joi from "joi";
import {
	Path,
	UseFormRegister,
	useForm,
} from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "react-query";
import { ServerError } from "@/services/axios";
import { RegisterParams } from "@/services/auth";
import { register as registerAuth } from "@/services/auth";
interface ISignUpFormValues {
	name: string;
	username: string;
	email: string;
	password: string;
	confirm_password: string;
	terms: boolean;
}

const defaultSignUpState: ISignUpFormValues = {
	name: "",
	username: "",
	email: "",
	password: "",
	confirm_password: "",
	terms: false,
};

const schema = Joi.object({
	name: Joi.string().required(),
	username: Joi.string()
		.lowercase()
		.alphanum()
		.min(3)
		.max(30)
		.required(),
	email: Joi.string().email({ tlds: { allow: false } }),
	password: Joi.string().min(8).max(30).required(),
	confirm_password: Joi.any()
		.valid(Joi.ref("password"))
		.required(),
	terms: Joi.boolean().invalid(false).required(),
});

type InputProps = {
	label: Path<ISignUpFormValues>;
	register: UseFormRegister<ISignUpFormValues>;
};

const TextInput = ({ label, register }: InputProps) => (
	<>
		<div className="group">
			<label className="font-bold text-md capitalize">
				{label}
			</label>
			<input
				type={label === "email" ? "email" : "text"}
				className={`w-full outline-0 transition-all duration-200 ease-in-out bg-blue-100 rounded-md py-1 px-4 mt-2 ring-0 group-hover:ring-4 group-hover:ring-red-200 group-hover:ring-opacity-50`}
				{...register(label)}
			/>
		</div>
	</>
);

const PasswordInput = ({ label, register }: InputProps) => (
	<>
		<div className="group">
			<label className="font-bold text-md capitalize">
				{label === "confirm_password"
					? "Confirm Password"
					: "Password"}
			</label>
			<input
				type="password"
				className={`w-full outline-0 transition-all duration-200 ease-in-out bg-blue-100 rounded-md py-1 px-4 mt-2 ring-0 group-hover:ring-4 group-hover:ring-red-200 group-hover:ring-opacity-50`}
				{...register(label)}
			/>
		</div>
	</>
);

const index = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<ISignUpFormValues>({
		defaultValues: defaultSignUpState,
		resolver: joiResolver(schema),
	});

	const onSubmit = async ({
		name,
		email,
		username,
		password,
	}: ISignUpFormValues) => {
		// alert(
		// 	`name: ${name}, email: ${email}, username: ${username}, password: ${password}`
		// );

		await registerMutation({
			name,
			email,
			username,
			password,
		});
	};

	const { mutateAsync: registerMutation } = useMutation<
		void,
		ServerError,
		RegisterParams
	>(registerAuth);

	return (
		<main>
			<div className="grid grid-cols-4 overflow-hidden">
				<div className="flex flex-col bg-[#F3D083] min-h-screen">
					<div className="flex flex-col p-8 space-y-4">
						<div>
							<p className="text-2xl text-orange-900 opacity-60 font-semibold">
								drippple
							</p>
						</div>
						<div>
							<p className="text-4xl text-orange-900 font-bold opacity-80">
								Discover the world’s top Designers &
								Creatives.
							</p>
						</div>
					</div>
					<div>
						<Image
							src="https://cdn.dribbble.com/assets/auth/sign-up-2b63dbffcc69046adb0ec414be26771ce10d91a8f9b4de7c281bcbee9e95d9f9.png"
							alt="image"
							width={700}
							height={800}
						/>
					</div>
					<div className="pl-8 text-orange-900 font-medium text-lg">
						Art by{" "}
						<Link
							href="https://dribbble.com/tarka"
							className="underline"
						>
							Peter Tarka
						</Link>
					</div>
				</div>
				<div></div>
				<div className="flex items-center justify-center">
					<div className="flex flex-col space-y-4 w-full">
						<h3 className="font-bold text-3xl text-center">
							Sign up to Dribbble
						</h3>
						<div className="flex justify-center">
							Sign up using google and twitter
						</div>
						<div className="flex items-center space-x-4 mx-8">
							<div className="w-1/2 h-[1px] bg-gray-300"></div>
							<div>Or</div>
							<div className="w-1/2 h-[1px] bg-gray-300"></div>
						</div>
						<form
							className="flex flex-col mx-8 space-y-4"
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className="flex space-x-3 justify-between">
								<TextInput
									label="name"
									register={register}
								/>
								<TextInput
									label="username"
									register={register}
								/>
							</div>
							{errors.name && (
								<p className="text-red-400 font-medium">
									{errors.name.message}
								</p>
							)}
							{errors.username && (
								<p className="text-red-400 font-medium">
									{errors.username.message}
								</p>
							)}

							<TextInput
								label="email"
								register={register}
							/>
							{errors.email && (
								<p className="text-red-400 font-medium">
									{errors.email.message}
								</p>
							)}

							<PasswordInput
								label="password"
								register={register}
							/>
							{errors.password && (
								<p className="text-red-400 font-medium">
									{errors.password.message}
								</p>
							)}

							<PasswordInput
								label="confirm_password"
								register={register}
							/>
							{errors.confirm_password && (
								<p className="text-red-400 font-medium">
									confirm password must be the same as
									password
								</p>
							)}

							<div className="flex space-x-4 items-start">
								<input
									type="checkbox"
									id="checkbox"
									className="w-10 h-10"
									{...register("terms")}
								/>
								<p className="p-0 mt-2">
									Creating an account means you’re okay with
									our Terms of Service, Privacy Policy, and
									our default Notification Settings.
								</p>
							</div>
							{errors.terms && (
								<p className="text-red-400 font-medium">
									You need to agree terms to sign up
								</p>
							)}
							<div className=" w-1/2">
								<button
									className="py-2 px-4 bg-[#EA4C89] text-white font-medium text-center w-full rounded-md hover:opacity-60"
									type="submit"
								>
									Create Account
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className="flex justify-end p-8 text-sm">
					Already a member? &nbsp;
					<Link
						href="/session/new"
						className="text-blue-700"
					>
						Sign In
					</Link>
				</div>
			</div>
		</main>
	);
};

export default index;
