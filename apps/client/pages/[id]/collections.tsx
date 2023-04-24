import UserProfile from "@/Components/UserProfile/UserProfile";
import { useRouter } from "next/router";
import React from "react";

const CollectionsPage = () => {
	const router = useRouter();

	const { id } = router.query;

	const dummyUserData = {
		id: "1",
		name: "Khaing Myel Khant",
		address: "Mandalay, Myanmar",
		profileUrl: "abc",
		description:
			"Mobile Design, UI / Visual Design, UX Design Research",
	};

	// fetch query data from user id

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
			<div>Collections </div>
		</section>
	);
};

export default CollectionsPage;
