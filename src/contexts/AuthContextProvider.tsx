import {
  useContext,
  createContext,
  useEffect,
  useState,
  ComponentPropsWithoutRef,
} from "react";
import { auth } from "../firebase/config";
import { useTranslation } from "react-i18next";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

type AuthContextValue = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void | UserCredential>;
  logOut: () => void;
  signUp: (
    name: string,
    email: string,
    password: string
  ) => Promise<void | UserCredential>;
  passwordReset: (email: string) => void;
  error: string;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthContextProvider = ({
  children,
}: ComponentPropsWithoutRef<"div">) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (!user.emailVerified) {
          auth.signOut();
          setError(t("auth.emailNotVerified"));
        } else {
          setUser(user);
        }
        return userCredential;
      })
      .catch((err) => {
        setError(err.message);
        console.error(err.message);
      });
  };

  const passwordReset = async (email: string) => {
    await sendPasswordResetEmail(auth, email).catch((err) => {
      setError(err.message);
      console.error(err.message);
    });
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const signUp = async (name: string, email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(userCredential.user);
        // Set display name
        updateProfile(userCredential.user, {
          displayName: name,
        });
        // TODO: Add Toast message
        return userCredential;
      })
      .catch((err) => {
        setError(err.message);
        console.error(err.message);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
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
        passwordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
