import classes from "./CategoryLink.module.css";

const CategoryButton = (props) => {
  return <button className={classes["category-link"]}>{props.children}</button>;
};

export default CategoryButton;
