import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

import { CategoriesContext } from "../../contexts/categories.context";

import "./category.styles.scss";

const Category = () => {
  const { category } = useParams(); // dynamically set category value base on our route value
  // console.log({category})
  const { categoriesMap } = useContext(CategoriesContext);
  console.log({ categoriesMap });
  const [products, setProducts] = useState(categoriesMap[category]); // categoriesMap default is an empty object

  useEffect(() => {
    // our products will only re-render if category, or categoriesMap changes
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products && // check if products is undefined (data not retireved from firebase yet)
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
