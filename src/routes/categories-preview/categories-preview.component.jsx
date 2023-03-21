import { useContext, Fragment } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Fragment> 
      {/* object.keys() returns an array of keys from an object */}
      {Object.keys(categoriesMap).map((title) => { // map through keys and store as the title variable (title contains category array)
        const products = categoriesMap[title]; // products now contains each category array
        return <CategoryPreview key={title} title={title} products={products}/>
      }  
      )}
    </Fragment>
  );
};

export default CategoriesPreview;