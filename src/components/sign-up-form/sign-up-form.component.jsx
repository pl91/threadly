import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up-form-.styles.scss";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("can't create user, email already in use");
      } else {
        console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target; // onChange, destructer name and value from event.target
    setFormFields({ ...formFields, [name]: value }); // update our state value by targeting name and appending new value
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          required
          onChange={handleChange}
          name="displayName"
          type="text"
          value={displayName} // set value to state value ("") -starts as empty string
        />

        <FormInput
          label="Email"
          required
          onChange={handleChange}
          name="email"
          type="email"
          value={email}
        />

        <FormInput
          label="Password"
          required
          onChange={handleChange}
          name="password"
          type="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          required
          onChange={handleChange}
          name="confirmPassword"
          type="password"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
