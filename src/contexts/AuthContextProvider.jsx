import { useContext, createContext, useEffect, useState } from "react";
import {
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase/config";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        if (!user.user.emailVerified) {
          console.error("Email not verified");
          setError("Email not verified");
          signOut(auth);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const logOut = () => {
    signOut(auth);
  };

  const signUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((err) => {
      setError(err.message);
    });
    await sendEmailVerification(userCredential.user);
    signOut(auth);
    return userCredential;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, logOut, signUp, user, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
