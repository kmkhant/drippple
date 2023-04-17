import React from "react";

const ShotsSection: React.FC = () => {
	return (
		<div className="mx-12 md:mx-32 py-8">
			{/* Shots Filters div */}
			<div className="flex justify-between">
				<div>popular</div>
				<div>filters</div>
			</div>
		</div>
	);
};

export default ShotsSection;
