import React, { useEffect, useState } from "react";
import HeroSection from "../../src/Components/HeroSection/HeroSection";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { getShotById } from "@/services/shot";
import { ServerError } from "@/services/axios";
import { Shot } from "@drippple/schema";
import { GetServerSideProps, NextPage } from "next";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

interface IPageProp {
	data: Shot;
}

const index = ({ data }: IPageProp) => {
	// fetch id and display shot
	const router = useRouter();

	const user = data.user;
	const loggedInUser = useAppSelector(
		(state) => state.auth.user
	);

	return (
		<section className="mx-16">
			<div className="flex justify-center">
				<div className="">
					<div className="flex items-center space-x-3">
						<div className="w-10 h-10 bg-blue-400 rounded-full flex justify-center items-center">
							<span className="text-white">
								{user.name[0].toUpperCase()}
							</span>
						</div>
						<div className="text-sm">
							<div className="font-semibold">
								{data.title}
							</div>
							<div className="text-slate-400">
								{user.name}
							</div>
						</div>
					</div>
					<div className="mt-12">
						<Image
							src={data.shotImage}
							width={800}
							height={800}
							alt={"test"}
						/>
					</div>
					<div className="mt-12">{data.description}</div>
					{user.id === loggedInUser?.id && (
						<div className="flex justify-center mt-16">
							<div className="flex items-center space-x-5">
								<Link
									className="py-2 px-4 bg-slate-200 rounded-md"
									href={`/uploads/${data.id}/edit`}
								>
									Edit
								</Link>
								<button className="py-2 px-4 bg-slate-200 rounded-md">
									Delete
								</button>
							</div>
						</div>
					)}
					<div className="flex justify-between items-center mt-16">
						<div className="h-0.5 w-full bg-slate-300 mr-12"></div>
						<div className="">
							<div className="flex justify-center items-center h-10 w-10 bg-blue-300 rounded-full font-semibold text-white">
								<p>{user.name[0].toUpperCase()}</p>
							</div>
						</div>
						<div className="h-0.5 w-full bg-slate-300 ml-12"></div>
					</div>
					<div className="flex justify-center mt-8 font-semibold">
						{user.name}
					</div>
					<div className="flex justify-between mt-8">
						<p className="font-semibold text-sm">
							More by {user.name}
						</p>
						<Link
							className="text-sm text-pink-500"
							href={`/${user.username}`}
						>
							View Profile
						</Link>
					</div>
					<div className="min-h-[200px]"></div>
				</div>
			</div>
		</section>
	);
};

export default index;

export const getServerSideProps: GetServerSideProps<{
	data: Shot;
}> = async (context) => {
	// Fetch data from api
	const id = context.params?.id;
	let res;
	try {
		res = await getShotById(parseInt(id as string));
	} catch (e: any) {
		return {
			notFound: true,
		};
	}

	return { props: { data: res } };
};
