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
		<div className="mx-8 md:mx-16 py-8">
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
			{/* Shots */}
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
			<div className="grid grid-cols-6">
				<div>
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 96 24"
							role="img"
							aria-labelledby="ahthn9oyj47hi1rq2pf0pf74diz8kdx4"
							className="w-[50%]"
						>
							<title id="ahthn9oyj47hi1rq2pf0pf74diz8kdx4">
								Dribbble: the community for graphic design
							</title>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M95.8512 18.5141C91.8395 25.3156 85.4862 23.342 83.5781 21.7968C82.7661 22.3478 81.342 23.5554 79.4433 23.4161C75.3996 23.1192 73.9514 17.3405 73.9514 17.3405C73.9804 17.3636 72.747 17.7662 72.0802 17.759C72.0716 19.4536 70.6067 23.5018 66.6533 23.4501C62.217 23.3922 61.3151 16.7828 61.3151 16.7828C61.3151 16.7828 60.8736 17.3959 59.195 18.0064C59.2795 16.7045 59.2177 23.2519 53.9006 23.3481C49.6971 23.4242 48.5623 16.6809 48.5623 16.6809C48.5623 16.6809 47.8331 17.4385 46.4199 17.7012C46.5097 16.378 46.3637 23.3703 41.0459 23.3481C37.4523 23.3331 36.2242 19.1941 36.3197 18.6197C36.4416 17.8875 35.1052 23.4511 31.6145 23.3644C30.1739 23.322 29.1 22.2791 28.4261 20.8885C27.524 21.9209 26.2142 23.3644 24.7448 23.3644C22.1075 23.3644 20.9446 21.1584 21.1416 14.8577C21.1583 14.1105 21.1044 13.8165 20.3616 13.7047C19.9157 13.6304 19.459 13.4895 18.976 13.4152C18.8211 13.932 17.5076 23.1962 12.9912 23.372C11.476 23.4311 10.6475 22.1186 9.96715 21.1443C8.92417 22.5241 7.54738 23.4161 5.58603 23.4161C2.26365 23.4161 0 20.7302 0 17.417C0 14.1038 2.26365 11.4182 5.58603 11.4182C6.17345 11.4182 6.33836 11.5024 6.87502 11.659C5.77137 1.61058 8.37774 0.0401515 10.6578 0.0401515C12.8467 0.0401515 16.5863 5.12064 11.3244 18.0074C12.4926 21.8512 15.0111 21.6338 16.2214 13.7212C16.4676 12.1128 15.809 9.9423 16.8335 9.63937C18.7061 9.08575 18.9048 10.7468 19.7828 11.0235C20.7112 11.316 21.2531 11.2875 22.1444 11.4736C23.6674 11.771 24.2618 12.5892 24.0761 14.4113C23.8533 16.7171 23.4636 20.0729 24.652 20.4818C25.5091 20.779 27.0739 19.0016 27.3485 18.0291C27.623 17.0566 27.6803 16.7237 27.7047 16.0105C27.7419 14.4859 27.7884 13.3684 28.0484 12.2154C28.1597 11.7693 28.2865 11.4739 28.7912 11.4537C29.2066 11.4431 29.9661 11.318 30.3005 11.5782C30.7461 11.9131 30.6905 12.2529 30.6393 13.1471C30.121 25.8966 34.11 19.5319 35.2994 14.4357C34.876 8.67313 35.1667 0.145675 38.7779 0.00265405C40.6559 -0.0717249 41.4861 1.43282 41.5775 2.55581C41.8357 5.72757 40.3888 10.9815 38.4859 14.5148C37.3984 21.7242 43.2411 23.1498 44.1754 17.3952C42.6467 16.6684 40.9947 13.7265 42.339 12.2928C43.0934 11.4882 46.2335 12.6441 46.2849 15.1651C47.8252 14.7531 48.0308 13.8835 48.0522 14.0276C47.6287 8.265 48.0214 0.145749 51.6328 0.00272768C53.5106 -0.0716513 54.3408 1.43289 54.4321 2.55589C54.6904 5.72764 53.2435 10.9816 51.3408 14.5149C50.253 21.7243 56.096 23.1498 57.0301 17.3953C55.8983 17.1769 53.5091 14.0478 54.8876 12.2929C55.6243 11.3551 58.7528 13.3053 59.1032 15.2486C60.5829 14.8298 60.7838 13.9878 60.805 14.1296C60.3815 8.36712 60.7742 0.247876 64.3855 0.104854C66.2634 0.0304754 67.0936 1.53502 67.1849 2.65802C67.4432 5.82977 65.9962 11.0838 64.0933 14.6171C63.0058 21.8266 68.8485 23.2519 69.7829 17.4973C68.2276 17.2383 66.0171 13.9344 67.7962 12.2442C68.507 11.5689 71.2229 13.3219 71.8586 15.3218C72.742 15.2878 73.2918 14.9833 73.4097 14.9525C71.9995 8.18754 73.0493 0.0705829 76.9342 0.00282686C79.0338 -0.0337594 81.0867 1.13799 80.1856 7.57394C79.3256 13.7146 76.234 16.2916 76.2411 16.331C76.4211 17.0667 78.0074 23.2233 82.0023 19.9749C81.7955 19.5066 81.5885 19.0282 81.4728 18.4486C80.8107 15.0729 82.1112 11.2599 85.6462 10.6436C87.6715 10.2906 89.5793 11.2766 89.881 13.4996C90.3773 17.1371 87.0927 19.7715 85.8437 20.3429C85.2843 20.0251 90.9148 23.6362 94.2563 16.3995C94.45 15.9863 94.6837 16.0213 94.9863 16.2343C95.2 16.3847 96.4175 17.5379 95.8512 18.5141ZM8.00277 16.5233C7.83274 16.0149 7.48381 14.8949 7.36044 14.4096C6.68091 13.8187 6.19588 13.7227 5.32365 13.7227C3.38526 13.7227 2.24437 15.5148 2.24437 17.4473C2.24437 19.3798 3.48729 21.1722 5.42567 21.1722C7.10552 21.1722 8.38402 20.03 8.77408 18.4132C8.50106 17.7829 8.23024 17.2036 8.00277 16.5233ZM10.6103 2.70004C9.24825 2.70004 8.78622 5.94913 8.87589 8.72092C8.95519 11.1715 9.63996 13.329 9.99519 14.2956C10.0854 14.4168 10.0686 14.338 10.1491 14.4665C12.514 9.28488 11.5331 2.70004 10.6103 2.70004ZM38.9724 2.80209C37.212 2.60021 37.2233 9.93334 37.4419 11.5782C38.3561 10.1157 39.9444 3.1959 38.9724 2.80209V2.80209ZM51.827 2.80209C50.0667 2.60021 50.078 9.93334 50.2966 11.5782C51.2108 10.1157 52.7991 3.1959 51.827 2.80209ZM64.5798 2.90412C62.8194 2.70223 62.8307 10.0354 63.0494 11.6804C63.9635 10.2177 65.5518 3.2979 64.5798 2.90412V2.90412ZM77.1284 2.37283C74.3857 2.9236 75.0244 12.0682 75.4409 13.672C78.6717 9.23475 78.7381 2.20615 77.1284 2.37283V2.37283ZM87.4073 13.8005C87.268 13.2175 86.5707 12.9058 86.0894 12.9826C84.7123 13.1707 83.3767 14.8858 83.8937 17.497C84.0087 18.0786 84.2967 18.6138 84.2921 18.5961C87.3741 16.5285 87.636 14.8991 87.4073 13.8005ZM29.3312 9.43526C28.9376 9.43534 28.5528 9.31869 28.2255 9.10007C27.8982 8.88145 27.6431 8.57067 27.4924 8.20705C27.3417 7.84344 27.3023 7.4433 27.379 7.05726C27.4558 6.67122 27.6453 6.31661 27.9236 6.03827C28.2019 5.75994 28.5565 5.57039 28.9425 5.49359C29.3285 5.41679 29.7287 5.45619 30.0923 5.60681C30.456 5.75744 30.7668 6.01252 30.9854 6.33979C31.2041 6.66706 31.3208 7.05183 31.3208 7.44542C31.3208 7.70672 31.2693 7.96546 31.1693 8.20686C31.0694 8.44827 30.9228 8.66763 30.7381 8.8524C30.5533 9.03718 30.334 9.18375 30.0926 9.28376C29.8512 9.38377 29.5925 9.43525 29.3312 9.43526V9.43526Z"
							></path>
						</svg>
					</div>
					<div className="my-4">
						<p className="text-sm">
							Dribbble is the world&apos;s leading community
							for creatives to share, grow, and get hired.
						</p>
					</div>
					<div className="flex space-x-3">
						<div>
							<FontAwesomeIcon icon={faDribbble} />
						</div>
						<div>
							<FontAwesomeIcon icon={faTwitter} />
						</div>
						<div>
							<FontAwesomeIcon icon={faFacebook} />
						</div>
						<div>
							<FontAwesomeIcon icon={faInstagram} />
						</div>
						<div>
							<FontAwesomeIcon icon={faPinterest} />
						</div>
					</div>
				</div>
				<div>
					<h6 className="font-semibold text-md">
						For designers
					</h6>
					<div className="flex flex-col mt-4 space-y-4">
						<p className="text-sm inline-block">
							<Link href="#">Go Pro!</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Explore design work</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Design blog</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Overtime podcast</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Playoffs</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Refer a Friend</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Code of conduct</Link>{" "}
						</p>
					</div>
				</div>
				<div>
					<h6 className="font-semibold text-md">
						Hire designers
					</h6>
					<div className="flex flex-col mt-4 space-y-4">
						<p className="text-sm inline-block">
							<Link href="#">Post a job opening</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Post a freelance project</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Search for designers</Link>{" "}
						</p>
					</div>
					<h6 className="font-semibold text-md mt-4 ">
						Brands
					</h6>
					<div className="flex flex-col mt-4 space-y-4">
						<p className="text-sm inline-block">
							<Link href="#">Advertise with us</Link>{" "}
						</p>
					</div>
				</div>
				<div>
					<h6 className="font-semibold text-md">Company</h6>
					<div className="flex flex-col mt-4 space-y-4">
						<p className="text-sm inline-block">
							<Link href="#">About</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Careers</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Support</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Media kit</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Testimonials</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">API</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Terms of service</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Privacy policy</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Cookie policy</Link>{" "}
						</p>
					</div>
				</div>
				<div>
					<h6 className="font-semibold text-md">
						Directories
					</h6>
					<div className="flex flex-col mt-4 space-y-4">
						<p className="text-sm inline-block">
							<Link href="#">Design jobs</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Designers for hire</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">
								Freelance designers for hire
							</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Tags</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Places</Link>{" "}
						</p>
					</div>
					<h6 className="font-semibold text-md mt-4 ">
						Design assets
					</h6>
					<div className="flex flex-col mt-4 space-y-4">
						<p className="text-sm inline-block">
							<Link href="#">Dribbble Marketplace</Link>{" "}
						</p>
					</div>
				</div>
				<div>
					<h6 className="font-semibold text-md">
						Design Resources
					</h6>
					<div className="flex flex-col mt-4 space-y-4">
						<p className="text-sm inline-block">
							<Link href="#">Freelancing</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Design Hiring</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Design Portfolio</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Design Education</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Creative Process</Link>{" "}
						</p>
						<p className="text-sm inline-block">
							<Link href="#">Design Industry Trends</Link>{" "}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShotsSection;
