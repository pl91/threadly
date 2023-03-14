import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { signOutUser } from '../../utils/firebase/firebase.utils'



import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext); // if currentUser changes state or props Navigation will also re-render
  const { isCartOpen } =useContext(CartContext);
  
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? ( // when there is a currentUser, run code
            <span onClick={signOutUser} className="nav-link"> SIGN OUT</span>
          ) : ( // else run this code 
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {/* if statement is true then return last value <CartDropdown /> (components have a truthy value) */}
        {isCartOpen && <CartDropdown />} 
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
