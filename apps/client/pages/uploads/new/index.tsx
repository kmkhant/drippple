import { ServerError } from "@/services/axios";
import { createShot } from "@/services/shot";
import {
	faClose,
	faCross,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";

interface ICreatePost {
	title: string;
	shotImage: string;
	description: string;
	tags: string[];
}

const index = () => {
	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLInputElement>(null);

	const [shotImage, setShotImage] = useState<string>("");

	const [tags, setTags] = useState<string[]>([]);
	const tagRef = useRef<HTMLInputElement>(null);

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.code === "Enter") {
			if (tagRef.current) {
				const newTag = tagRef.current.value;
				setTags((prev) => [...prev, newTag]);
				tagRef.current.value = "";
			}
		} else if (e.code === "Backspace") {
			if (tagRef.current && tags.length > 0) {
				if (tagRef.current.value.length === 0) {
					removeTag(tags.length - 1);
				}
			}
		} else {
			return;
		}
	};

	const removeTag = (idx: number) => {
		const newTags = tags.filter((v, i) => i !== idx);
		setTags(newTags);
	};

	const { mutateAsync: createPostMutation } = useMutation<
		void,
		ServerError,
		ICreatePost
	>(createShot);

	const handleSubmit = async () => {
		if (titleRef.current && descriptionRef.current) {
			const title = titleRef.current.value;
			const description = descriptionRef.current.value;

			await createPostMutation({
				title,
				description,
				shotImage,
				tags,
			});
		}
	};

	return (
		<main>
			<section className="mx-4 my-2">
				<div className="flex justify-between">
					<div>
						<button className="outline-1 outline px-4 py-2 rounded-lg outline-gray-300 text-sm text-gray-600 font-medium">
							Cancel
						</button>
					</div>
					<div className="flex space-x-4">
						<button
							className="px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium text-gray-600 hover:cursor-not-allowed"
							disabled
						>
							Save as draft
						</button>
						<button
							className="px-4 py-2 rounded-lg bg-pink-400 text-sm font-medium text-white disabled:hover:cursor-not-allowed"
							disabled={tags.length === 0}
							onClick={handleSubmit}
						>
							Post
						</button>
					</div>
				</div>
			</section>
			<section className="mx-12">
				<div className="flex justify-center mt-16">
					<div>
						<div className="w-1/2">
							<input
								placeholder="Give me a name"
								className="outline-0 text-6xl font-semibold"
								ref={titleRef}
							/>
						</div>
						<div className="flex w-1/2 mt-4 text-xl">
							<div>
								<div>
									<p className="text-pink-500">
										Project Image
									</p>
									<input
										placeholder="enter image url"
										className="outline-0 mt-2"
										onBlur={(c) =>
											setShotImage(c.currentTarget.value)
										}
										onKeyDown={(e) => {
											if (e.key === "Enter")
												setShotImage(e.currentTarget.value);
										}}
									/>
								</div>
							</div>
							{shotImage.length !== 0 && (
								<div>
									<Image
										src={shotImage}
										alt={"Project Image"}
										width={400}
										height={400}
									/>
								</div>
							)}
						</div>
						<div className="flex w-1/2 mt-4 text-xl">
							<div>
								<div>
									<p className="text-pink-500">
										Description
									</p>
									<input
										placeholder="enter description"
										className="outline-0 mt-2"
										ref={descriptionRef}
									/>
								</div>
							</div>
						</div>
						<div className="flex w-1/2 mt-4 text-xl">
							<div></div>
							<div>
								<div>
									<p className="text-pink-500">Tags</p>
									<div className="flex items-center mt-2 space-x-4">
										{tags.map((tag, idx) => (
											<div
												key={idx}
												className="px-4 py-0.5 bg-slate-200 rounded-md relative flex items-center space-x-4"
											>
												<div>{tag}</div>
												<div className="">
													<FontAwesomeIcon
														icon={faClose}
														className="w-2 h-2 hover:bg-slate-400 px-2 rounded-full transition-all duration-300 ease-in-out bg-opacity-0 hover:bg-opacity-80"
														onClick={() => removeTag(idx)}
													/>
												</div>
											</div>
										))}
										<input
											placeholder="tag"
											className="outline-0"
											onKeyDown={onKeyDown}
											ref={tagRef}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default index;
