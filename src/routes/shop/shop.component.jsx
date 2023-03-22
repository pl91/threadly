import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

const Shop = () => {
  return (
    // path value is dynamically set by pulling category value from Category using useParams
    <Routes>
      <Route index element ={<CategoriesPreview />}></Route>
      <Route path=':category' element={<Category/>}></Route> 
    </Routes>
  );
};

export default Shop;


