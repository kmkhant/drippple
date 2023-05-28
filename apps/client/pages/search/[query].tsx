import {
	faChevronDown,
	faClose,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, Transition } from "@headlessui/react";

const Page = () => {
	const router = useRouter();
	const query = router.query.query;

	const [rotation, setRotation] = useState<number>(0);

	const inputRef = useRef<HTMLInputElement>(null);
	const [queryInput, setQueryInput] = useState<string>("");

	// fetch param if not found 404
	return (
		<section className="relative min-h-screen bg-gray-100">
			<div className="w-full h-[110px]"></div>
			<div className="min-h-[80vh] bg-white"></div>
			<div className="absolute left-0 w-full top-20">
				<div className="flex justify-center">
					<div className="w-1/3 bg-white shadow-lg rounded-md px-4 py-4">
						<div className="relative flex justify-between space-x-4 items-center">
							<div className="flex justify-between items-center grow space-x-4">
								<FontAwesomeIcon icon={faMagnifyingGlass} />
								<div className="grow">
									<input
										type="text"
										className="outline-none placeholder:bottom-0"
										placeholder="Search..."
										ref={inputRef}
										onChange={() => {
											if (inputRef.current) {
												setQueryInput(
													inputRef.current.value
												);
											}
										}}
									/>
								</div>

								{queryInput.length > 0 && (
									<div>
										<FontAwesomeIcon
											icon={faClose}
											className="cursor-pointer"
											onClick={() => {
												if (inputRef.current) {
													inputRef.current.value = "";
													setQueryInput("");
												}
											}}
										/>
									</div>
								)}
							</div>

							<Menu>
								<Menu.Button>
									<div
										className="relative flex justify-between py-2 px-4 cursor-pointer"
										onClick={() => {
											console.log("HI");
											setRotation((prev) => prev + 180);
										}}
									>
										<div>Shots</div>
										<div className="w-[30px]"></div>
										<motion.div
											animate={{ rotate: rotation }}
										>
											<FontAwesomeIcon
												icon={faChevronDown}
												className="w-3 h-3"
											/>
										</motion.div>
									</div>
								</Menu.Button>
								<Menu.Items
									as="div"
									className="absolute top-16 right-0 drop-shadow-lg rounded-lg text-sm"
								>
									<Menu.Item
										as="div"
										className="py-2 bg-white"
									>
										{({ active }) => (
											<p
												className={`${
													active
														? "bg-gray-100"
														: "bg-white"
												} font-medium py-4 px-4`}
											>
												Shots
											</p>
										)}
									</Menu.Item>
									<Menu.Item
										as="div"
										className="py-2 bg-white"
									>
										{({ active }) => (
											<p
												className={`${
													active
														? "bg-gray-100"
														: "bg-white"
												} font-medium py-4 px-4`}
											>
												Marketplace
											</p>
										)}
									</Menu.Item>
									<Menu.Item
										as="div"
										className="py-2 bg-white"
									>
										{({ active }) => (
											<p
												className={`${
													active
														? "bg-gray-100"
														: "bg-white"
												} font-medium py-4 px-4`}
											>
												Members
											</p>
										)}
									</Menu.Item>
									<Menu.Item
										as="div"
										className="py-2 bg-white"
									>
										{({ active }) => (
											<p
												className={`${
													active
														? "bg-gray-100"
														: "bg-white"
												} font-medium py-4 px-4`}
											>
												Teams
											</p>
										)}
									</Menu.Item>
								</Menu.Items>
							</Menu>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Page;
