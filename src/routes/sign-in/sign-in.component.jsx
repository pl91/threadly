import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    // destructer user object form response
    const {user} = await signInWithGooglePopup();
    // pass user response into our createUserDocumentFromAuth() method
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>
        Sign in with Google Popup
      </button>
    </div>
  );
};

export default SignIn;
