import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronDown,
	faEllipsis,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
	Listbox,
	Menu,
	Transition,
} from "@headlessui/react";
import Link from "next/link";

interface IUserProfileData {
	id: string;
	name: string;
	profileUrl: string;
	address: string;
	description: string;
}

const UserProfile: React.FC<IUserProfileData> = ({
	id,
	name,
	profileUrl,
	address,
	description,
}) => {
	const [selectedType, setSelectedType] =
		useState<string>("Popular Shots");

	const router = useRouter();

	const paths = router.pathname.split("/");

	const path = paths[paths.length - 1];

	return (
		<>
			<div className="flex justify-center items-center p-8">
				<div className="flex items-center space-x-10">
					<div className="self-start">
						<Image
							src={`https://picsum.photos/seed/${
								Math.random() * 1000
							}/100/100`}
							width={100}
							height={100}
							className="rounded-full"
							alt="profile photo"
						/>
					</div>
					<div className="flex flex-col space-y-2">
						<h5 className="font-semibold text-xl">
							{name}
						</h5>
						<p className="text-md text-gray-400">
							{address}
						</p>
						<p className="text-md text-gray-400">
							{description}
						</p>
						<div className="flex space-x-3 items-center">
							<div>
								<button className="bg-gray-200 py-1.5 px-3 rounded-lg text-sm">
									<FontAwesomeIcon icon={faPlus} />{" "}
									&nbsp;&nbsp;Follow
								</button>
							</div>
							<Menu as="div">
								<Menu.Button className="bg-white px-3 py-1 rounded-lg border border-gray-200">
									<FontAwesomeIcon icon={faEllipsis} />
								</Menu.Button>
								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute mt-2 w-56 divide-y text-sm divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
										<div className="px-4 py-2">
											<Menu.Item>
												<div className="mt-2 text-gray-500 cursor-pointer">
													Add or remove from lists...
												</div>
											</Menu.Item>
										</div>
										<div className="px-4 py-2">
											<Menu.Item>
												<div className="my-2 text-gray-500 cursor-pointer">
													Block {name}
												</div>
											</Menu.Item>
											<Menu.Item>
												<div className="my-2 text-gray-500 cursor-pointer">
													Report {name}
												</div>
											</Menu.Item>
										</div>
									</Menu.Items>
								</Transition>
							</Menu>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-between">
				<div className="flex space-x-3">
					<div>
						<Link href={`/${id}`}>
							<span
								className={`${
									path === "[id]" ? "font-semibold" : ""
								} `}
							>
								Work
							</span>{" "}
						</Link>
						<span className="font-medium text-gray-400">
							&nbsp;{43}
						</span>
					</div>
					<div>
						<Link href={`/${id}/collections`}>
							<span
								className={`${
									path === "collections"
										? "font-semibold"
										: ""
								} `}
							>
								Collections
							</span>{" "}
						</Link>
						<span className="font-medium text-gray-400">
							&nbsp;{6}
						</span>
					</div>
					<div>
						<Link href="#">
							<span
								className={`${
									path === "likes" ? "font-semibold" : ""
								} `}
							>
								Liked Shots
							</span>{" "}
						</Link>
						<span className="font-medium text-gray-400">
							&nbsp;{1543}
						</span>
					</div>
					<div>
						<Link href="#">About</Link>
					</div>
				</div>
				<div>
					<Listbox
						value={selectedType}
						onChange={setSelectedType}
					>
						<div className="relative">
							<Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 px-3 outline outline-1 outline-gray-200">
								<span>{selectedType}</span>
								<FontAwesomeIcon
									icon={faChevronDown}
									className="w-8 h-8"
								/>
							</Listbox.Button>
							<Transition
								as={Fragment}
								leave={"transition ease-in duration-100"}
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full rounded-md bg-white py-1 text-base outline outline-1 outline-gray-100 shadow-md">
									<Listbox.Option value="Popular Shots">
										<p className="text-center py-2 hover:bg-gray-200 cursor-pointer">
											Popular Shots
										</p>
									</Listbox.Option>
									<Listbox.Option value="Recent Shots">
										<p className="text-center py-2 hover:bg-gray-200 cursor-pointer">
											Recent Shots
										</p>
									</Listbox.Option>
								</Listbox.Options>
							</Transition>
						</div>
					</Listbox>
				</div>
			</div>
		</>
	);
};

export default UserProfile;
