import React from "react";
import Image from "next/image";
import Link from "next/link";

const index = () => {
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
						<div className="flex flex-col mx-8 space-y-4">
							<div className="flex space-x-3 justify-between">
								<div className="group">
									<p className="font-bold text-md">Name</p>
									<input
										type="text"
										className="w-full outline-0 transition-all duration-200 ease-in-out bg-gray-100 rounded-md py-1 px-4 mt-2 ring-0 group-hover:ring-4 group-hover:ring-red-200 group-hover:ring-opacity-50"
									/>
								</div>
								<div className="group">
									<p className="font-bold text-md">
										Username
									</p>
									<input
										type="text"
										className="w-full outline-0 transition-all duration-200 ease-in-out bg-gray-100 rounded-md py-1 px-4 mt-2 ring-0 group-hover:ring-4 group-hover:ring-red-200 group-hover:ring-opacity-50"
									/>
								</div>
							</div>

							<div className="group ">
								<p className="font-bold text-md">Email</p>
								<input
									type="email"
									className="w-full outline-0 transition-all duration-200 ease-in-out bg-gray-100 rounded-md py-1 px-4 mt-2 ring-0 group-hover:ring-4 group-hover:ring-red-200 group-hover:ring-opacity-50"
								/>
							</div>

							<div className="group w-full ">
								<div className="flex justify-between">
									<p className="font-bold text-md">
										Password
									</p>
								</div>
								<input
									type="text"
									placeholder="6+ characters"
									className="w-full outline-0 transition-all duration-200 ease-in-out bg-gray-100 rounded-md py-1 px-4 mt-2 ring-0 group-hover:ring-4 group-hover:ring-red-200 group-hover:ring-opacity-50 placeholder-slate-300"
								/>
							</div>
							<div className="flex space-x-4 items-start">
								<input
									type="checkbox"
									id="checkbox"
									name="agreee"
									className="w-10 h-10"
								/>
								<p className="p-0 mt-2">
									Creating an account means you’re okay with
									our Terms of Service, Privacy Policy, and
									our default Notification Settings.
								</p>
							</div>
							<div className=" w-1/2">
								<button className="py-2 px-4 bg-[#EA4C89] text-white font-medium text-center w-full rounded-md hover:opacity-60">
									Create Account
								</button>
							</div>
						</div>
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
