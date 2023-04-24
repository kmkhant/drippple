import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronDown,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Listbox, Transition } from "@headlessui/react";
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

	return (
		<>
			<div className="flex justify-center items-center p-8">
				<div className="flex items-center space-x-3">
					<div>
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
						<div>
							<button className="bg-gray-200 py-1 px-2 rounded-lg text-sm">
								<FontAwesomeIcon icon={faPlus} /> Follow
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-between">
				<div className="flex space-x-3">
					<div>
						<Link href={`/${id}`}>
							<span className="font-semibold">Work</span>{" "}
						</Link>
						<span className="font-medium text-gray-400">
							&nbsp;{43}
						</span>
					</div>
					<div>
						<Link href={`/${id}/collections`}>
							<span className="font-medium">
								Collections
							</span>{" "}
						</Link>
						<span className="font-medium text-gray-400">
							&nbsp;{6}
						</span>
					</div>
					<div>
						<Link href="#">
							<span className="font-medium">
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
								<Listbox.Options className="absolute mt-2 max-h-60 w-full rounded-md bg-white py-1 text-base outline outline-1 outline-gray-100 shadow-md">
									<Listbox.Option value="Popular Shots">
										<p className="text-center py-2 hover:bg-gray-300 cursor-pointer">
											Popular Shots
										</p>
									</Listbox.Option>
									<Listbox.Option value="Recent Shots">
										<p className="text-center py-2 hover:bg-gray-300 cursor-pointer">
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
