import { useContext } from "react";

import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.component";

import './shop.styles.scss'

const Shop = () => {
    const {products} = useContext(ProductsContext);
    return (
        <div className="products-container">
            {products.map((product) => ( // map through our products data
                <ProductCard key={product.id} product={product}/> // create a new card containing our current id, and product 
            ))} 
        </div>
    )
}

export default Shop;