import './button.style.scss'

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

// Dynamically set our button class to our generaric button component through buttonType. Spread addition button props into custom component.
const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
    {...otherProps} // ...otherProps = type="submit", and more. children= html elements 
    >        
      {children} 
    </button>
  );
};

export default Button;
