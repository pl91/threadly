import { useContext, Fragment } from 'react';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

import './shop.styles.scss';

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => ( // map over object keys and set to title
        <Fragment key={title}>
          <h2>{title}</h2>
          <div className='products-container'>
            {categoriesMap[title].map((product) => ( // map over categoriesMap[title] and access each product
              <ProductCard key={product.id} product={product} /> // create a new card containing our current id, and product 
            ))}
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Shop;


