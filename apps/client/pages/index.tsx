import React from "react";

import HeroSection from "../src/Components/HeroSection/HeroSection";
import ShotsSection from "@/Components/Shots Section/ShotsSection";

const index: React.FC = () => {
	return (
		<div className="relative">
			<HeroSection />
			<ShotsSection />
		</div>
	);
};
export default index;
