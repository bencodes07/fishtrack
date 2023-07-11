import { useRef, useState, useEffect } from "react";
import { UserAuth } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const submitLogin = useRef();

  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const submitSignup = useRef();

  const { signIn, signUp, user, error } = UserAuth();
  const container = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    user != null ? navigate("/") : navigate("/login");
  }, [user, navigate]);

  const onSubmitLogin = async (e) => {
    e.preventDefault();

    await signIn(emailLogin, passwordLogin);
  };

  const onSubmitSignup = async (e) => {
    e.preventDefault();
    if (
      document.getElementById("confirm") != document.getElementById("password")
    )
      return (document.getElementById("error").innerText =
        "Error: Passwords do not match");

    await signUp(emailSignup, passwordSignup);
  };

  const handleSignUpSwitch = () => {
    container.current.classList.add("right-panel-active");
  };

  const handleLogInSwitch = () => {
    container.current.classList.remove("right-panel-active");
  };

  return (
    <main className="flex justify-center items-center flex-col min-h-screen bg-[#f6f5f7]">
      <div className="container" id="container" ref={container}>
        <div className="form-container sign-up-container">
          <form onSubmit={onSubmitSignup}>
            <h1 className="text-3xl mb-3">Create Account</h1>
            <input
              type="email"
              onChange={(e) => setEmailSignup(e.target.value)}
              value={emailSignup}
              placeholder="Email"
              required
            />
            <input
              type="password"
              placeholder="Password"
              required
              id="password"
              value={passwordSignup}
              onChange={(e) => setPasswordSignup(e.target.value)}
            />
            <input
              type="password"
              id="confirm"
              placeholder="Confirm Password"
              required
            />
            <button type="submit" ref={submitSignup} className="mt-3">
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={onSubmitLogin}>
            <h1 className="text-3xl mb-3">Sign in</h1>
            <input
              type="email"
              placeholder="Email"
              required
              value={emailLogin}
              onChange={(e) => setEmailLogin(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
            />
            <p id="error" className="text-[#ff0000] relative top-[-15px]">
              {error}
            </p>
            <button ref={submitLogin} className="mt-[-2rem]" type="submit">
              Sign In
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="text-3xl">Welcome Back!</h1>
              <p className="text-white">
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn" onClick={handleLogInSwitch}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="text-3xl">Hello, Friend!</h1>
              <p className="text-white">
                Enter your personal details and start journey with us
              </p>
              <button
                className="ghost"
                id="signUp"
                onClick={handleSignUpSwitch}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
