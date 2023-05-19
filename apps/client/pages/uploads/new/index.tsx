import React from "react";

const index = () => {
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
							className="px-4 py-2 rounded-lg bg-pink-400 text-sm font-medium text-white hover:cursor-not-allowed"
							disabled
						>
							Continue
						</button>
					</div>
				</div>
			</section>
		</main>
	);
};

export default index;
