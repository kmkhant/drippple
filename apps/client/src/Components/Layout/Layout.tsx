import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useRouter } from "next/router";

interface LayoutProps {
	children: React.ReactNode;
}

const hide = ["/session/new", "/signup/new"];

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const router = useRouter();

	const hideFlag = hide.includes(router.pathname);

	console.log(hideFlag);

	return (
		<>
			{!hideFlag && <Navbar />}
			<div>{children}</div>
			{!hideFlag && <Footer />}
		</>
	);
};

export default Layout;
