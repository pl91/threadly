import "./category-item.styles.scss";


const CategoryItem = ({ category }) => { //accept a category object 
    const { imageUrl, title } = category; // de-structer from our prop and return content
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
