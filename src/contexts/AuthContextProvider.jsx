import { useContext, createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const signIn = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (!user.user.emailVerified) {
          console.error("Email not verified");
          setError("Email not verified");
          document.getElementById("error").style.color = "#ff0000";
          auth.signOut();
        }
        document.getElementById("error").style.color = "#008000";
        setError("Success!");
      })
      .catch((err) => {
        setError(err.message);
        document.getElementById("error").style.color = "#ff0000";
      });
  };

  const logOut = () => {
    auth.signOut();
  };

  const signUp = async (email, password) => {
    const userCredential = await auth
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        setError(err.message);
      });
    /* await auth.sendEmailVerification(userCredential.user); */
    auth.signOut();
    return userCredential;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
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
