import { useContext, createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useTranslation } from "react-i18next";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const signIn = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (!user.user.emailVerified) {
          console.error(t("Email not verified"));
          setError(t("Email not verified"));
          document.getElementById("error").style.color = "#ff0000";
          auth.signOut();
        } else {
          document.getElementById("error").style.color = "#008000";
          setError(t("Successful!"));
        }
      })
      .catch((err) => {
        setError(err.message);
        document.getElementById("error").style.color = "#ff0000";
      });
  };

  const forgetPassword = (email) => {
    auth.sendPasswordResetEmail(email);
    document.getElementById("error").style.color = "#008000";
    setError(t("Password Reset Email Sent!"));
  };

  const forgetPasswordHome = (email) => {
    auth.sendPasswordResetEmail(email);
    alert(t("Password Reset Email Sent!"));
  };

  const logOut = () => {
    auth.signOut();
  };

  const signUp = async (name, email, password) => {
    const userCredential = await auth
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        return setError(err.message);
      });
    await userCredential.user.updateProfile({ displayName: name });
    await userCredential.user.sendEmailVerification();

    setError(t("Verify Email Sent!"));
    auth.signOut();
    return userCredential;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        logOut,
        signUp,
        user,
        error,
        forgetPassword,
        forgetPasswordHome,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
