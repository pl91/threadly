import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// import SHOP_DATA from "../shop-data.js";

export const CategoriesContext = createContext({
  categoriesMap: {}, 
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({}); // initialize as an empty object
  // useEffect(() => { // this was used only once to add data to our firebase db (save only for reference)
  //   addCollectionAndDocuments('categories', SHOP_DATA)
  // }, [])

  useEffect(() => {
    const getCategoriesMap = async () => { // always wrap aync methods in a new async function when inside a useEffect()
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []); // run only when provider mounts

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
