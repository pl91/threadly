import CategoryItem from "../category-item/category-item.component";

import "./directory.styles.scss";

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        // pass the category object as a prop to CategoryItem
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
