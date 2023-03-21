import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (
  buttonType = BUTTON_TYPE_CLASSES.base // default value
) =>
  ({
    // map object
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]); // the value of buttonType is passed to map object

// Dynamically set our button class to our generaric button component through buttonType. Spread addition button props into custom component.
const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton
      {...otherProps} // ...otherProps = type="submit", and more. children= html elements
    >
      {children}
    </CustomButton>
  );
};

export default Button;
