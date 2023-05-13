import React from "react";
import Image from "next/image";
import {
	faHeart,
	faEye,
	faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatter } from "kmformatter";
import ActionButton from "./ActionButton";
import Link from "next/link";

interface IShotCard {
	id: string;
	name: string;
	shortUrl: string;
	shortTitle: string;
	profileUrl: string;
	likes: number;
	views: number;
}

const ShotCard: React.FC<IShotCard> = ({
	id,
	name,
	shortUrl,
	profileUrl,
	shortTitle,
	likes,
	views,
}) => {
	return (
		<div className="relative">
			<div
				id="mom"
				className="cursor-pointer relative group"
			>
				<div className="transition-all delay-150 duration-300 ease-out absolute h-full w-full bg-gradient-to-t from-black from-10% to-50% to-transparent opacity-0 group-hover:opacity-80 rounded-lg "></div>
				<div className="absolute transition-all delay-150 duration-300 ease-out bottom-5 opacity-0 group-hover:opacity-100 mx-4 w-[90%]">
					<div className="relative flex justify-between items-center transition-opacity duration-300 ease-in opacity-0 group-hover:opacity-100">
						<div>
							<p className="font-semibold text-white">
								{shortTitle}
							</p>
						</div>
						<div className="flex space-x-3">
							<ActionButton icon={faFolderPlus} />
							<ActionButton icon={faHeart} />
						</div>
					</div>
				</div>
				<Image
					src={shortUrl}
					width={400}
					height={300}
					className="rounded-lg z-0 w-full"
					alt="random image"
				/>
			</div>
			<div className="flex my-2 justify-between items-center">
				<div className="inline-flex items-center space-x-2">
					<div className="">
						<Image
							src={profileUrl}
							width={25}
							height={25}
							className="rounded-full"
							alt="random image"
						/>
					</div>
					<div className="flex items-center">
						<p className="inline-block font-medium text-sm truncate">
							<Link href={id}>{name}</Link>
						</p>
					</div>
				</div>

				<div className="flex space-x-2">
					<div className="flex space-x-2 items-center">
						<FontAwesomeIcon
							icon={faHeart}
							className="w-[14px] h-[14px] hover:text-red-500 cursor-pointer"
						/>
						<p className="inline-block text-sm">
							{formatter(likes, 1)}
						</p>
					</div>
					<div className="flex space-x-2 items-center">
						<FontAwesomeIcon
							icon={faEye}
							className="w-[14px] h-[14px]"
						/>
						<p className="inline-block text-sm">
							{formatter(views, 1)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShotCard;
