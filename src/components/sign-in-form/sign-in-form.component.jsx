import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithAuthEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  console.log(formFields);

  const signInWithGoogle = async () => {
    // destructer user object form response
    const { user } = await signInWithGooglePopup();
    // pass user response into our createUserDocumentFromAuth() method
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(userDocRef);
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // use firebase to handle the submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signInWithAuthEmailAndPassword(email, password);
      console.log(response);
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
    <div className="sign-in-container">
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={"google"}
            onClick={signInWithGoogle}
          >
            Google sign-in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
