import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener,  createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// all children will have access to UserContext
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // value is what we expose with our context provider
  const value = { currentUser, setCurrentUser };

  // runs only once when the component mounts or when our authState changes
  useEffect(() => {
    //  this listener checks our user auth state automatically when it's initialized
    const unsubscribe = onAuthStateChangedListener((user) => { // onOnstateChanged has access to our auth in firebase utils
      if(user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user)
    })

    // return unsubscribe on unmount (which is a method we extract from onAuthStateChange)
    return unsubscribe
  }, [])

  // by passing value into our provider value, we have given children access to currentUser and setCurrentUser on UserContext object
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
