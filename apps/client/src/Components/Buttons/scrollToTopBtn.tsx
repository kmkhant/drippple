import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const ScrollToTopBtn: React.FC = () => {
	const [showTopBtn, setShowTopBtn] = useState(false);

	// implement scroll to top
	useEffect(() => {
		if (typeof window)
			window.addEventListener("scroll", () => {
				if (window.scrollY > 100) {
					setShowTopBtn(true);
				} else {
					setShowTopBtn(false);
				}
			});
	}, []);

	const goToTop = () => {
		if (typeof window !== undefined) {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	};

	return (
		<button className="inline-block" onClick={goToTop}>
			<div
				className={`fixed z-10 bg-gray-500 text-white w-12 h-12 right-8 bottom-8 flex items-center justify-center rounded-full transition-opacity duration-100 ease-in ${
					showTopBtn ? "opacity-100" : "opacity-0"
				}`}
			>
				<FontAwesomeIcon icon={faArrowUp} />
			</div>
		</button>
	);
};

export default ScrollToTopBtn;
