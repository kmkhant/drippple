import React from "react";
import Image from "next/image";
import {
	faHeart,
	faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import nFormatter from "@/utils/nFormatter";

interface IShotCard {
	name: string;
	shortUrl: string;
	profileUrl: string;
	likes: number;
	views: number;
}

const ShotCard: React.FC<IShotCard> = ({
	name,
	shortUrl,
	profileUrl,
	likes,
	views,
}) => {
	return (
		<div className="">
			<div className="cursor-pointer">
				<Image
					src={shortUrl}
					width={400}
					height={300}
					className="rounded-lg"
					alt="random image"
				/>
			</div>
			<div className="flex my-2 justify-between items-center">
				<div className="flex items-center space-x-2">
					<div className="">
						<Image
							src={profileUrl}
							width={25}
							height={25}
							className="rounded-full"
							alt="random image"
						/>
					</div>
					<p className="inline-block font-medium truncate">
						{name}
					</p>
				</div>

				<div className="flex space-x-2">
					<div className="flex space-x-2 items-center">
						<FontAwesomeIcon
							icon={faHeart}
							className="w-[16px] h-[16px] hover:text-red-500 cursor-pointer"
						/>
						<p className="inline-block text-sm">
							{nFormatter(likes)}
						</p>
					</div>
					<div className="flex space-x-2 items-center">
						<FontAwesomeIcon
							icon={faEye}
							className="w-[16px] h-[16px]"
						/>
						<p className="inline-block text-sm">
							{nFormatter(views)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShotCard;
