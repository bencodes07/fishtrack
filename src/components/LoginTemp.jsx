import { useRef, useState, useEffect } from "react";
import { UserAuth } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";

function LoginTemp() {
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
      <div
        className="container bg-white rounded-2xl shadow-2xl relative overflow-hidden w-[768px] max-w-full min-h-[480px]"
        id="container"
        ref={container}
      >
        <div className="form-container sign-up-container absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-[50%] z-1">
          <form
            onSubmit={onSubmitSignup}
            className="bg-white flex items-center justify-center flex-col px-[0px] py-[50px] h-full text-center"
          >
            <h1 className="text-3xl mb-3 font-bold m-0">Create Account</h1>
            <input
              type="email"
              onChange={(e) => setEmailSignup(e.target.value)}
              value={emailSignup}
              placeholder="Email"
              required
              className="bg-[#eeeeee] border-none px-[12px] py-[15px] mx-[8px] my-2 w-[80%] rounded-xl pl-3"
            />
            <input
              type="password"
              placeholder="Password"
              required
              id="password"
              value={passwordSignup}
              onChange={(e) => setPasswordSignup(e.target.value)}
              className="bg-[#eeeeee] border-none px-[12px] py-[15px] mx-[8px] my-2 w-[80%] rounded-xl pl-3"
            />
            <input
              type="password"
              id="confirm"
              placeholder="Confirm Password"
              required
              className="bg-[#eeeeee] border-none px-[12px] py-[15px] mx-[8px] my-2 w-[80%] rounded-xl pl-3"
            />
            <button type="submit" ref={submitSignup} className="mt-3">
              Sign Up
            </button>
          </form>
        </div>
        <div className=" absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-[50%] z-10">
          <form
            onSubmit={onSubmitLogin}
            className="bg-white flex items-center justify-center flex-col px-[0px] py-[50px] h-full text-center"
          >
            <h1 className="text-3xl mb-3 font-bold m-0">Sign in</h1>
            <input
              type="email"
              placeholder="Email"
              required
              value={emailLogin}
              onChange={(e) => setEmailLogin(e.target.value)}
              className="bg-[#eeeeee] border-none px-[12px] py-[15px] mx-[8px] my-2 w-[80%] rounded-xl pl-3"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
              className="bg-[#eeeeee] border-none px-[12px] py-[15px] mx-[8px] my-2 w-[80%] rounded-xl pl-3"
            />
            <p
              id="error"
              className="text-[#ff0000] relative top-[-15px] text-sm font-light leading-5 tracking-wide m-[20px] my-[10px]"
            >
              {error}
            </p>
            <button ref={submitLogin} type="submit">
              Sign In
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="text-3xl font-bold m-0">Welcome Back!</h1>
              <p className="text-white text-sm font-light leading-5 tracking-wide m-[20px] my-[10px]">
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn" onClick={handleLogInSwitch}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="text-3xl font-bold m-0">Hello, Friend!</h1>
              <p className="text-white text-sm font-light leading-5 tracking-wide m-[20px] my-[10px]">
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

export default LoginTemp;
