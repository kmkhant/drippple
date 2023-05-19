import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import classes from "./Navbar.module.css";
import { useAppSelector } from "@/store/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowTrendUp,
	faBriefcase,
	faChartLine,
	faChevronRight,
	faEnvelope,
	faFolderPlus,
	faHeart,
	faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, Transition } from "@headlessui/react";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/auth/authSlice";

const Navbar = () => {
	const user = useAppSelector((state) => state.auth.user);
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const handleLogOut = () => {
		dispatch(logout());
	};

	return (
		<nav className={classes.navbar}>
			<div className={classes.navbar_desktop_left}>
				<div className={classes.navlogo_container}>
					<Link href="/">
						<img src="/dribble_logo.svg" />
					</Link>
				</div>
				<div className={classes.nav_paths}>
					<ul>
						<li>
							<Link href="">Inspiration</Link>
						</li>
						<li>
							<Link href="">Find Work</Link>
						</li>
						<li>
							<Link href="">Learn Design</Link>
						</li>
						<li>
							<Link href="">Go Pro</Link>
						</li>
						<li>
							<Link href="">Hire Designers</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className={classes.navbar_desktop_right}>
				<ul className={classes.nav_actions}>
					<li>
						<Link href="">
							<img src="/searchicon.png"></img>
						</Link>
					</li>
					{user ? (
						<>
							<div className="flex space-x-8 items-center ml-4">
								<FontAwesomeIcon
									icon={faBriefcase}
									className="fa-xl text-gray-400"
								/>
								<FontAwesomeIcon
									icon={faEnvelope}
									className="fa-xl text-gray-400"
								/>
								<div
									className=""
									onMouseEnter={() => setOpenMenu(true)}
									onMouseLeave={() => setOpenMenu(false)}
								>
									<div className="w-10 h-10 rounded-full bg-blue-400 flex justify-center items-center">
										<span className="text-white font-medium inline-block">
											K
										</span>
									</div>
									<Transition
										show={openMenu}
										enter="transition-opactiy duration-75"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="transition opacity duration-150"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<div className="absolute px-4 py-4 bg-white rounded-md right-8 z-10">
											<div className="outline outline-1 outline-gray-200 p-8 rounded-lg shadow-md">
												<div className="bg-violet-300 font-semibold text-violet-500 py-2 px-4 rounded-full text-sm text-center">
													Limited Account
												</div>
												<div className="text-sm font-medium text-center my-4">
													Get a free Designer Account to{" "}
													<br />
													access all features.
												</div>
												<div className="flex justify-center">
													<p className="underline text-sm text-center font-semibold text-pink-500">
														<a href="#">Learn More</a>
													</p>
												</div>
											</div>
											<div className="flex flex-col mx-2 my-4 text-gray-500 space-y-4">
												<div className="hover:bg-gray-100 py-2 px-4">
													Profile
												</div>
												<hr className="" />
												<div className="hover:bg-gray-100 py-2 px-4">
													Edit Profile
												</div>
												<div className="hover:bg-gray-100 py-2 px-4">
													Edit Work Preferences
												</div>
												<hr className="" />
												<div className="flex space-x-2 items-center py-2 px-4 hover:bg-gray-100">
													<FontAwesomeIcon
														icon={faArrowTrendUp}
														className=""
													/>
													<div className="">
														My Boosted Shots
													</div>
												</div>
												<div className="flex space-x-2 items-center py-2 px-4 hover:bg-gray-100">
													<FontAwesomeIcon
														icon={faHeart}
														className=""
													/>
													<div className="">My Likes</div>
												</div>
												<div className="flex space-x-2 items-center py-2 px-4 hover:bg-gray-100">
													<FontAwesomeIcon
														icon={faFolderPlus}
														className=""
													/>
													<div className="">
														My Collections
													</div>
												</div>
												<div className="flex justify-between hover:bg-gray-100">
													<div className="flex space-x-2 items-center py-2 px-4">
														<FontAwesomeIcon
															icon={faStar}
															className="text-pink-500"
														/>
														<div className="">Go Pro</div>
													</div>

													<div className="place-self-end">
														<FontAwesomeIcon
															icon={faChevronRight}
															className="w-2 h-2"
														/>
													</div>
												</div>
												<hr />
												<div className="hover:bg-gray-100 py-2 px-4">
													Account Settings
												</div>
												<div
													className="hover:bg-gray-100 py-2 px-4 cursor-pointer"
													onClick={handleLogOut}
												>
													Sign Out
												</div>
												<hr />
											</div>
										</div>
									</Transition>
								</div>

								<button className="bg-[#ea4c89] py-2 px-4 rounded-lg font-medium text-white">
									Upload
								</button>
							</div>
						</>
					) : (
						<>
							<li>
								<Link
									href="/session/new"
									className={classes.signIn}
								>
									Sign in
								</Link>
							</li>
							<li>
								<Link
									href="/signup/new"
									className={classes.signUp}
								>
									Sign up
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
