import { NextPage } from "next";
import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { useRouter } from "next/router";
import { faker } from "@faker-js/faker";
import UserProfile from "@/Components/UserProfile/UserProfile";
import ShotCard from "@/Components/Shots Section/ShotCard";
import { useIsInViewport } from "@/hooks/useIsInViewPort";

interface IShotData {
	name: string;
	shortUrl: string;
	profileUrl: string;
	likes: number;
	views: number;
}

const User: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;

	console.log(id);

	const [selectedType, setSelectedType] =
		useState<string>("Popular Shots");

	const [fakeShots, setFakeShots] = useState<IShotData[]>(
		[]
	);

	const [infiniteScrollLimit, setInfiniteScrollLimit] =
		useState<number>(0);

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

	// reference to sentry
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

	const dummyUserData = {
		id: "1",
		name: "Khaing Myel Khant",
		address: "Mandalay, Myanmar",
		profileUrl: "abc",
		description:
			"Mobile Design, UI / Visual Design, UX Design Research",
	};

	return (
		<section className="mx-8 md:mx-32 py-8">
			<UserProfile
				id={dummyUserData.id}
				name={dummyUserData.name}
				address={dummyUserData.address}
				profileUrl={dummyUserData.profileUrl}
				description={dummyUserData.description}
			/>
			<div className="w-full h-0.5 bg-gray-200 my-5"></div>

			{/* Render fetched shots */}

			<div>
				<div
					className={`transition-transform duration-500 relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 left-0`}
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
						className={`flex justify-center transition-all duration-500`}
					>
						<button className="py-3 px-12 text-sm rounded-xl bg-gray-200 font-medium hover:bg-gray-300 ">
							Loading More...
						</button>
					</div>
				)}
				{infiniteScrollLimit === 2 && (
					<div
						className={`flex justify-center transition-all duration-500`}
					>
						<button
							className="py-3 px-12 text-sm rounded-xl bg-gray-200 font-medium hover:bg-gray-300"
							onClick={loadMoreFetch}
						>
							Load More Shots
						</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default User;
