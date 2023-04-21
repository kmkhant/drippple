import {
	faChevronDown,
	faBars,
	faMagnifyingGlass,
	faPaintRoller,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
	Fragment,
	useEffect,
	useState,
} from "react";
import { Menu, Transition } from "@headlessui/react";

const ShotsSection: React.FC = () => {
	const [bounce, setBounce] = useState(false);
	const [filterButtonState, setFilterButtonState] =
		useState(false);
	const [showFilterOptions, setShowFilterOptions] =
		useState(false);

	const [selectedType, setSelectedType] =
		useState<string>("Popular");

	const animate = () => {
		setBounce(true);
		setTimeout(() => setBounce(false), 100);
	};

	const animateFilterButton = () => {
		setShowFilterOptions((prev) => !prev);
		setFilterButtonState(true);
		setTimeout(() => setFilterButtonState(false), 100);
	};

	return (
		<div className="mx-12 md:mx-32 py-8">
			{/* Shots Filters div */}
			<div className="flex justify-between">
				<Menu as="div" className="relative inline-block">
					<div>
						<Menu.Button
							className={`block px-3 py-2 rounded-md outline outline-1 outline-gray-300 hover:ring-4 hover:ring-pink-100 hover:outline-none focus:ring-pink-100 focus:ring-4 ${
								bounce ? "scale-95" : ""
							} transition-all duration-100 ease-in-out`}
							onClick={() => animate()}
							onMouseDown={() => setBounce(true)}
							onMouseLeave={() => setBounce(false)}
						>
							<div className="flex">
								<span className="text-sm">
									{selectedType}&emsp;
								</span>

								<div className="flex items-center">
									<FontAwesomeIcon
										icon={faChevronDown}
										className="w-[10px] h-[10px]"
									/>
								</div>
							</div>
						</Menu.Button>
					</div>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute z-10 left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="py-1">
								<Menu.Item
									as="div"
									className={`hover:bg-gray-200`}
									onClick={() => setSelectedType("Popular")}
								>
									<button
										className={`text-gray-700 block px-4 py-2 text-sm`}
									>
										Popular
									</button>
								</Menu.Item>
								<Menu.Item
									as="div"
									className={`hover:bg-gray-200`}
									onClick={() =>
										setSelectedType("New & Noteworthy")
									}
								>
									<button
										className={`text-gray-700 block px-4 py-2 text-sm`}
									>
										New & Noteworthy
									</button>
								</Menu.Item>
							</div>
							<div className="py-1">
								<Menu.Item
									as="div"
									className={`hover:bg-gray-200`}
									onClick={() =>
										setSelectedType("Marketplace")
									}
								>
									<button
										className={`text-gray-700 block px-4 py-2 text-sm`}
									>
										Marketplace
									</button>
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
				<div className="relative inline-block">
					<button
						type="button"
						onClick={animateFilterButton}
						onMouseDown={() => setFilterButtonState(true)}
						onMouseLeave={() => setFilterButtonState(false)}
					>
						<div
							className={`flex items-center outline outline-1 outline-gray-300 rounded-lg space-x-2 py-2 px-3 ${
								filterButtonState
									? "bg-gray-200 outline-none outline-0"
									: ""
							} transition transition-color duration-75`}
						>
							<div>
								<FontAwesomeIcon
									icon={faBars}
									className="w-[10px] h-[10px]"
								/>
							</div>
							<div>
								<span className="text-sm">Filters</span>
							</div>
						</div>
					</button>
				</div>
			</div>
			{/* Shots */}
			<div className="my-4">
				<Transition
					show={showFilterOptions}
					enter="transition-all duration-75 ease-in-out"
					enterFrom="scale-y-0"
					enterTo="scale-y-100"
					leave="transition-all duration-75 ease-in-out"
					leaveFrom="scale-y-100"
					leaveTo="scale-y-0"
				>
					<div className="grid grid-cols-4 gap-2">
						<div>
							<h3 className="text-black">Tags</h3>
							<div className="flex space-x-2 bg-gray-100 my-1 transition-all duration-100 items-center p-2 rounded-lg focus-within:bg-white focus-within:outline focus-within:outline-2 focus-within:outline-pink-300 focus-within:ring-2 focus-within:ring-pink-200">
								<FontAwesomeIcon
									icon={faMagnifyingGlass}
									className="text-gray-400"
								/>
								<input className="w-full bg-transparent focus:outline-none" />
							</div>
						</div>
						<div>
							<div>
								<h3 className="text-black">Color</h3>
								<div className="flex space-x-2 bg-gray-100 my-1 transition-all duration-100 items-center p-2 rounded-lg focus-within:bg-white focus-within:outline focus-within:outline-2 focus-within:outline-pink-300 focus-within:ring-2 focus-within:ring-pink-200">
									<FontAwesomeIcon
										icon={faPaintRoller}
										className="text-gray-400"
									/>
									<span className="mx-2">#</span>
									<input
										className="w-full bg-transparent focus:outline-none"
										placeholder="Enter hex or select"
									/>
								</div>
							</div>
						</div>
						<div>
							<div>
								<h3 className="text-black">Timeframe</h3>
								<Menu
									as="div"
									className="relative inline-block text-left space-x-2 outline outline-1 outline-gray-200 bg-white will-change-contents my-1 transition-all duration-100 items-center p-2 rounded-lg w-full focus-within:bg-white focus-within:outline focus-within:outline-2 focus-within:outline-pink-300 focus-within:ring-2 focus-within:ring-pink-200"
								>
									<div>
										<Menu.Button className="inline-flex w-full justify-between items-center">
											<div>Now</div>
											<FontAwesomeIcon
												icon={faChevronDown}
												className="w-[10px] h-[10px]"
											/>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute z-10 w-full -left-2 mt-4 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											<div className="py-1">
												<Menu.Item
													as="div"
													className={`hover:bg-gray-200 cursor-pointer`}
													onClick={() =>
														setSelectedType("Popular")
													}
												>
													<button
														className={`text-gray-700 block px-4 py-2 text-sm`}
													>
														Now
													</button>
												</Menu.Item>
												<Menu.Item
													as="div"
													className={`hover:bg-gray-200 cursor-pointer`}
													onClick={() =>
														setSelectedType(
															"New & Noteworthy"
														)
													}
												>
													<button
														className={`text-gray-700 block px-4 py-2 text-sm`}
													>
														This Past Week
													</button>
												</Menu.Item>
												<Menu.Item
													as="div"
													className={`hover:bg-gray-200 cursor-pointer`}
													onClick={() =>
														setSelectedType(
															"New & Noteworthy"
														)
													}
												>
													<button
														className={`text-gray-700 block px-4 py-2 text-sm`}
													>
														This Past Month
													</button>
												</Menu.Item>
												<Menu.Item
													as="div"
													className={`hover:bg-gray-200 cursor-pointer`}
													onClick={() =>
														setSelectedType(
															"New & Noteworthy"
														)
													}
												>
													<button
														className={`text-gray-700 block px-4 py-2 text-sm`}
													>
														This Past Year
													</button>
												</Menu.Item>
												<Menu.Item
													as="div"
													className={`hover:bg-gray-200 cursor-pointer`}
													onClick={() =>
														setSelectedType(
															"New & Noteworthy"
														)
													}
												>
													<button
														className={`text-gray-700 block px-4 py-2 text-sm`}
													>
														All Time
													</button>
												</Menu.Item>
											</div>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
						<div>
							<div>
								<h3 className="text-black">Downloads</h3>
								<Menu
									as="div"
									className="relative inline-block text-left space-x-2 outline outline-1 outline-gray-200 bg-white will-change-contents my-1 transition-all duration-100 items-center p-2 rounded-lg w-full focus-within:bg-white focus-within:outline focus-within:outline-2 focus-within:outline-pink-300 focus-within:ring-2 focus-within:ring-pink-200"
								>
									<div>
										<Menu.Button className="inline-flex w-full justify-between items-center">
											<div>All Shots</div>
											<FontAwesomeIcon
												icon={faChevronDown}
												className="w-[10px] h-[10px]"
											/>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute z-10 w-full -left-2 mt-4 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											<div className="py-1">
												<Menu.Item
													as="div"
													className={`hover:bg-gray-200 cursor-pointer`}
													onClick={() =>
														setSelectedType("Popular")
													}
												>
													<button
														className={`text-gray-700 block px-4 py-2 text-sm`}
													>
														Now
													</button>
												</Menu.Item>
												<Menu.Item
													as="div"
													className={`hover:bg-gray-200 cursor-pointer`}
													onClick={() =>
														setSelectedType(
															"New & Noteworthy"
														)
													}
												>
													<button
														className={`text-gray-700 block px-4 py-2 text-sm`}
													>
														This Past Week
													</button>
												</Menu.Item>
												<Menu.Item
													as="div"
													className={`hover:bg-gray-200 cursor-pointer`}
													onClick={() =>
														setSelectedType(
															"New & Noteworthy"
														)
													}
												>
													<button
														className={`text-gray-700 block px-4 py-2 text-sm`}
													>
														This Past Month
													</button>
												</Menu.Item>
												<Menu.Item
													as="div"
													className={`hover:bg-gray-200 cursor-pointer`}
													onClick={() =>
														setSelectedType(
															"New & Noteworthy"
														)
													}
												>
													<button
														className={`text-gray-700 block px-4 py-2 text-sm`}
													>
														This Past Year
													</button>
												</Menu.Item>
												<Menu.Item
													as="div"
													className={`hover:bg-gray-200 cursor-pointer`}
													onClick={() =>
														setSelectedType(
															"New & Noteworthy"
														)
													}
												>
													<button
														className={`text-gray-700 block px-4 py-2 text-sm`}
													>
														All Time
													</button>
												</Menu.Item>
											</div>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>
				</Transition>
				<div className="grid grid-cols-4">
					<div>1</div>
					<div>2</div>
					<div>3</div>
					<div>4</div>
				</div>
			</div>
		</div>
	);
};

export default ShotsSection;
