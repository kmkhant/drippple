import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbar_desktop_left}>
        <div className={classes.navlogo_container}>
          <Link href="">
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
            <Link href=""><img src='/searchicon.png'></img></Link>
          </li>
          <li>
            <Link href="" className={classes.signIn}>
              Sign in
            </Link>
          </li>
          <li>
            <Link href="" className={classes.signUp}>
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
