import { useContext } from "react";

import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";

import { ProductCardContainer } from "./product-card.styles";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => addItemToCart(product)

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
      <footer>
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </footer>
    </ProductCardContainer>
  );
};

export default ProductCard;
