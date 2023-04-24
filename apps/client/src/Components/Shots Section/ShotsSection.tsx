import {
	faChevronDown,
	faBars,
	faMagnifyingGlass,
	faPaintRoller,
} from "@fortawesome/free-solid-svg-icons";
import {
	faFacebook,
	faDribbble,
	faTwitter,
	faInstagram,
	faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
	Fragment,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Menu, Transition } from "@headlessui/react";
import { faker } from "@faker-js/faker";
import ShotCard from "./ShotCard";
import { useIsInViewport } from "@/hooks/useIsInViewPort";
import Link from "next/link";
import ScrollToTopBtn from "../Buttons/scrollToTopBtn";
import Footer from "../Footer/Footer";

interface IShotData {
	name: string;
	shortUrl: string;
	profileUrl: string;
	likes: number;
	views: number;
}

const ShotsSection: React.FC = () => {
	const [bounce, setBounce] = useState(false);
	const [filterButtonState, setFilterButtonState] =
		useState(false);
	const [showFilterOptions, setShowFilterOptions] =
		useState(false);

	const [selectedType, setSelectedType] =
		useState<string>("Popular");

	const [fakeShots, setFakeShots] = useState<IShotData[]>(
		[]
	);

	const [infiniteScrollLimit, setInfiniteScrollLimit] =
		useState<number>(0);

	const animate = () => {
		setBounce(true);
		setTimeout(() => setBounce(false), 100);
	};

	const animateFilterButton = () => {
		setShowFilterOptions((prev) => !prev);
		setFilterButtonState(true);
		setTimeout(() => setFilterButtonState(false), 100);
	};

	const generateFakeShots = (count: number) => {
		const shotsData = [...new Array(count)].map(
			(c, idx) =>
				(c = {
					name: faker.name.fullName(),
					shortUrl: `https://picsum.photos/seed/${faker.name.fullName()}/400/300`,
					profileUrl: `https://picsum.photos/seed/${
						Math.random() * 1000
					}/50/50`,
					likes: Math.floor(
						Math.random() * (19999 - 1000 + 1) + 1000
					),
					views: Math.floor(
						Math.random() * (19999 - 1000 + 1) + 1000
					),
				})
		);

		return shotsData;
	};

	const cacheGenerate = useCallback(
		(count: number) => generateFakeShots(count),
		[fakeShots]
	);

	useEffect(() => {
		const fakeShotsData = cacheGenerate(20);
		setFakeShots(fakeShotsData);
	}, []);

	// check to load automatically for twice
	const loadRef = useRef(null);

	const isInViewport = useIsInViewport(loadRef);

	useEffect(() => {
		if (infiniteScrollLimit < 2) {
			const fakeShotsData = [
				...fakeShots,
				...cacheGenerate(20),
			];
			setFakeShots(fakeShotsData);
			setInfiniteScrollLimit((prev) => prev + 1);
		}
	}, [isInViewport]);

	const loadMoreFetch = () => {
		setInfiniteScrollLimit(0);
		const fakeShotsData = [
			...fakeShots,
			...cacheGenerate(20),
		];
		setFakeShots(fakeShotsData);
	};

	// https://css-tricks.com/animation-techniques-for-adding-and-removing-items-from-a-stack/

	return (
		<section className="mx-8 md:mx-16 py-8">
			{/* Shots Filters div */}
			<div className="flex justify-between px-2">
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
			<div className="relative mt-4 overflow-hidden p-2">
				{/* Filter Inputs */}
				<div
					className={`transition-all duration-500 ${
						showFilterOptions
							? "translate-y-0"
							: "translate-y-[-100px]"
					}`}
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
														All Shots
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
				</div>

				<div
					className={`transition-transform duration-500 relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 left-0 ${
						showFilterOptions
							? "translate-y-0"
							: "translate-y-[-90px]"
					}`}
				>
					{/* Shorts Here */}
					{fakeShots.map((data, idx) => (
						<ShotCard
							key={idx}
							name={data.name}
							shortUrl={data.shortUrl}
							profileUrl={data.profileUrl}
							likes={data.likes}
							views={data.views}
						/>
					))}
				</div>
				<div
					className="invisible"
					id="sentry"
					ref={loadRef}
				></div>
				{infiniteScrollLimit < 2 && (
					<div
						className={`flex justify-center transition-all duration-500${
							showFilterOptions
								? "translate-y-0"
								: "translate-y-[-100px]"
						}`}
					>
						<button className="py-3 px-12 text-sm rounded-xl bg-gray-200 font-medium hover:bg-gray-300 ">
							Loading More...
						</button>
					</div>
				)}
				{infiniteScrollLimit === 2 && (
					<div
						className={`flex justify-center transition-all duration-500 ${
							showFilterOptions
								? "translate-y-0"
								: "translate-y-[-100px]"
						}`}
					>
						<button
							className="py-3 px-12 text-sm rounded-xl bg-gray-200 font-medium hover:bg-gray-300"
							onClick={loadMoreFetch}
						>
							Load More Shots
						</button>
					</div>
				)}

				<ScrollToTopBtn />
			</div>
		</section>
	);
};

export default ShotsSection;
