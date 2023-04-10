import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import classes from "./HeroSection.module.css";
import categories from "../../config/categories";
// interface HeroSectionProps =

const Hero: React.FC = () => {
  const router = useRouter();
  const pathName = router.query.categoryname;
  let selectedCategory = categories.find(
    (category) => category.name === pathName
  );
  if (!selectedCategory) {
    selectedCategory = {
      name: "discover",
      title: "Explore the world’s leading design portfolios",
      text: "Millions of designers and agencies around the world showcase their portfolio work on Dribbble - the home to the world’s best design and creative professionals.",
      trend_searches: [
        "landing page",
        "ios",
        "food",
        "landingpage",
        "uxdesign",
        "app design",
      ],
      video_link:
        "https://cdn.dribbble.com/uploads/39417/original/49dbf46eae15d227fc95a69cee31251e.mp4?1657824906",
    };
  }
  return (
    <div className={classes.hero}>
      <ul className={classes["hero-categories"]}>
        {categories.map((category) => {
          return (
            <li key={category.name} className={classes["category-item"]}>
              <Link
                className={`${classes["category-link"]} ${
                  pathName == category.name ? classes.active : ""
                }`}
                href={`/shots/popular/${category.name}`}
              >
                {category.name
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={classes["hero-media"]}>
        <video src={selectedCategory.video_link} autoPlay muted loop>
          Sorry, your browser doesn't support videos.
        </video>
      </div>
      <div className={classes["text-content"]}>
        <h1>{selectedCategory.title}</h1>
        <h2>{selectedCategory.text}</h2>
      </div>
      <div className={classes["search-form"]}>
        <i className="fas fa-search"></i>
        <form>
          <label className={classes.accessibility}>Search</label>
          <input
            className={classes["search-input"]}
            type="search"
            placeholder="Search..."
          ></input>
        </form>
      </div>
      <ul className={classes["search-suggestions"]}>
        <li className={classes.label}>Trending Searches</li>
        {selectedCategory?.trend_searches.map((search) => (
          <li className={classes.item}>{search}</li>
        ))}
      </ul>
    </div>
  );
};

export default Hero;
