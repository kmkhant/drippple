import back_video from "../../assets/backgroundVideo.mp4";
import classes from "./Hero.module.css";
import CategoryLink from "./CategoryLink";

const Hero = () => {
  return (
    <div className={classes.hero}>
      <ul className={classes["hero-categories"]}>
        <CategoryLink>Discover</CategoryLink>
        <CategoryLink>Animation</CategoryLink>
        <CategoryLink>Branding</CategoryLink>
        <CategoryLink>Illustration</CategoryLink>
        <CategoryLink>Mobile</CategoryLink>
        <CategoryLink>Print</CategoryLink>
        <CategoryLink>Product Design</CategoryLink>
        <CategoryLink>Typography</CategoryLink>
        <CategoryLink>Web Design</CategoryLink>
      </ul>
      <div className={classes["hero-media"]}>
        <video src={back_video} autoPlay muted loop>
          Sorry, your browser doesn't support videos.
        </video>
      </div>
      <div className={classes["text-content"]}>
        <h1>Explore the world’s leading design portfolios</h1>
        <h2>
          Millions of designers and agencies around the world showcase their
          portfolio work on Dribbble - the home to the world’s best design and
          creative professionals.
        </h2>
      </div>
      <div className={classes['search-form']}>
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
      <ul className={classes['search-suggestions']}>
        <li className={classes.label}>Trending Searches</li>
        <li className={classes.item}>landing page</li>
        <li className={classes.item}>ios</li>
        <li className={classes.item}>food</li>
        <li className={classes.item}>landingpage</li>
        <li className={classes.item}>uxdesign</li>
        <li className={classes.item}>app design</li>
      </ul>
    </div>
  );
};

export default Hero;
