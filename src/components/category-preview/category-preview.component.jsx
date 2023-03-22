import { Link } from "react-router-dom";

import ProductCard from "../product-card/product-card.component";

import { CategoryPreviewContainer } from "./category-preview.styles";

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
        <div className="preview">
          {products // filter out the first four products in array
            .filter((_, idx) => idx < 4) // store element/product as _ because we only want to use the index
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </h2>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
