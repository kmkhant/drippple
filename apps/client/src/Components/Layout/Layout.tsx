import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useRouter } from "next/router";

interface LayoutProps {
	children: React.ReactNode;
}

const hide = [
	"/session/new",
	"/signup/new",
	"/uploads/new",
	"/uploads",
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const router = useRouter();

	const hideFlag =
		router.pathname.match("/uploads/(.*)") ||
		router.pathname.match("/session/(.*)") ||
		router.pathname.match("/signup/(.*)");

	// console.log(hideFlag);

	return (
		<>
			{!hideFlag && <Navbar />}
			<div>{children}</div>
			{!hideFlag && <Footer />}
		</>
	);
};

export default Layout;
