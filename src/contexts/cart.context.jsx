import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productsToAdd
  const existingCartItem = cartItems.find(
    (cartItems) => cartItems.id === productToAdd.id
  );
  // if found, increment quantity
  if (existingCartItem) {
    return cartItems.map(
      (cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 } // if matched return new object with updated quantity
          : cartItem // if not matched return with no changes
    );
  }
  // return new array with modified cartItems/ new cart item with a quantity of 1
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// find if cartItems contains productsToRemove
const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    // return new cartItems array that does not include productToRemove
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  // return back cart items with matching cart item with reduced quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};

const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const Cartprovider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // We use useffect() here to update our cartCount and cartTotal using our onClick handler which directly updates dependencies(cartItems)

  useEffect(() => {  // useEffect runs only when it's dependecies change (cartItems in this case)
    const newCartCount = cartItems.reduce( // reduce returns our accumulator value (not a new array)
      (total, cartItem) => total + cartItem.quantity, // return total after callback
      0 // total is set to 0 by default
    );
    setCartCount(newCartCount); // set new count
  }, [cartItems]); // run code only when cartItems changes

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);
  

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
