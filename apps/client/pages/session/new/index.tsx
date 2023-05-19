import React, {
	ChangeEventHandler,
	useMemo,
	useRef,
	useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import Joi from "joi";
import {
	Controller,
	Path,
	UseFormRegister,
	useForm,
} from "react-hook-form";
import {
	useAppDispatch,
	useAppSelector,
} from "@/store/hooks";
import { useIsMutating, useMutation } from "react-query";
import { joiResolver } from "@hookform/resolvers/joi";
import { ServerError } from "@/services/axios";
import { LoginParams, login } from "@/services/auth";
import router from "next/router";

const defaultState: IFormValues = {
	identifier: "",
	password: "",
};

const schema = Joi.object({
	identifier: Joi.string().required(),
	password: Joi.string().min(6).required(),
});

interface IFormValues {
	identifier: string;
	password: string;
}

type InputProps = {
	label: Path<IFormValues>;
	register: UseFormRegister<IFormValues>;
	required: boolean;
};

const Input = ({
	label,
	register,
	required,
}: InputProps) => (
	<>
		<div className="group">
			<label className="font-bold text-md">{label}</label>
			<input
				type={label === "identifier" ? "text" : "password"}
				className={`w-full outline-0 transition-all duration-200 ease-in-out bg-blue-100 rounded-md py-1 px-4 mt-2 ring-0 group-hover:ring-4 group-hover:ring-red-200 group-hover:ring-opacity-50`}
				{...register(label, { required })}
			/>
		</div>
	</>
);

const index = () => {
	const dispatch = useAppDispatch();
	const [showPassword, setShowPassword] =
		useState<boolean>(false);

	const isMutating = useIsMutating();
	const isLoading = useMemo(
		() => isMutating > 0,
		[isMutating]
	);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<IFormValues>({
		defaultValues: defaultState,
		resolver: joiResolver(schema),
	});

	const { mutateAsync: loginMutation } = useMutation<
		void,
		ServerError,
		LoginParams
	>(login);

	// TODO - implment google login

	const onSubmit = async ({
		identifier,
		password,
	}: IFormValues) => {
		await loginMutation({
			identifier: identifier,
			password,
		});
	};

	/////////////////

	return (
		<main>
			<div className="grid grid-cols-4 overflow-hidden">
				<div className="flex flex-col bg-[#F1CCD9] min-h-screen">
					<div className="flex flex-col p-8 space-y-4">
						<div>
							<p className="text-2xl text-orange-900 opacity-60 font-semibold">
								drippple
							</p>
						</div>
						<div>
							<p className="text-4xl text-orange-900 font-bold opacity-80">
								Discover the world&apos;s top Designers &
								Creatives.
							</p>
						</div>
					</div>
					<div>
						<Image
							src="https://cdn.dribbble.com/assets/auth/sign-in-a63d9cf6c1f626ccbde669c582b10457b07523adb58c2a4b46833b7b4925d9a3.jpg"
							alt="image"
							width={700}
							height={800}
						/>
					</div>
					<div className="pl-8 text-orange-900 font-medium text-lg">
						Art by{" "}
						<Link
							href="https://dribbble.com/karicca"
							className="underline"
						>
							Irina Valeeva
						</Link>
					</div>
				</div>
				<div></div>
				<div className="flex items-center justify-center">
					<div className="flex flex-col space-y-4 w-full">
						<h3 className="font-bold text-3xl text-center">
							Sign in to Dribbble
						</h3>
						<div className="flex justify-center">
							Sign in using google and twitter
						</div>
						<div className="flex items-center space-x-4 mx-8">
							<div className="w-1/2 h-[1px] bg-gray-300"></div>
							<div>Or</div>
							<div className="w-1/2 h-[1px] bg-gray-300"></div>
						</div>
						<div className="mx-8">
							<form
								className=""
								onSubmit={handleSubmit(onSubmit)}
							>
								{/*  */}
								<Input
									key="emailInput"
									label="identifier"
									register={register}
									required
								/>
								<p className="text-red-400 font-medium pt-2">
									{errors.identifier?.message}
								</p>

								<Input
									key="passwordInput"
									label="password"
									register={register}
									required
								/>
								<p className="text-red-400 font-medium pt-2">
									{errors.password?.message}
								</p>

								<div className="mt-4 w-1/2">
									<button
										className="py-2 px-4 bg-[#EA4C89] text-white font-medium text-center w-full rounded-md"
										type="submit"
									>
										Sign In
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className="flex justify-end p-8 text-sm">
					Not a member? &nbsp;
					<Link
						href="/signup/new"
						className="text-blue-700"
					>
						Sign up now
					</Link>
				</div>
			</div>
		</main>
	);
};

export default index;
