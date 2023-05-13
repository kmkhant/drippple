import React from "react";
import Image from "next/image";
import Link from "next/link";

const index = () => {
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
								Discover the world’s top Designers &
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
							<p className="font-bold text-md">
								Username or Email Address
							</p>
						</div>
					</div>
				</div>
				<div>hi</div>
			</div>
		</main>
	);
};

export default index;
