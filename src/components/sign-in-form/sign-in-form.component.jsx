import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  signInWithGooglePopup,
  signInWithAuthEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { SignInContainer, ButtonsContainer } from "./sign-in-form";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // use firebase to handle the submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      signInWithAuthEmailAndPassword(email, password);

      resetFormFields();
    } catch (error) {
      // check if case value matched error.code
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break; // if matched end code
        case "auth/user-not-found":
          alert("no user assouciated with this email");
          break;
        default:
          console.log(error);
      }
      console.log(error);
    }
    console.log("user signed in");
  };

  // Store and set values onChange (target by name and set value)
  const handleChange = (event) => {
    const { name, value } = event.target;
    // set a new value to our formFields
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already Have an Account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          required
          onChange={handleChange}
          name="email"
          type="email"
          value={email}
        />
        <FormInput
          label="password"
          required
          onChange={handleChange}
          name="password"
          type="password"
          value={password}
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google sign-in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
