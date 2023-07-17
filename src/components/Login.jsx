import { useState, useEffect } from "react";
import { UserAuth } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const { signIn, error } = UserAuth();

  const navigate = useNavigate();

  const onSubmitLogin = async (e) => {
    e.preventDefault();

    await signIn(emailLogin, passwordLogin);
  };

  useEffect(() => {
    if (error == "Success!") {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error, navigate]);

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left"></div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
        <form onSubmit={(e) => onSubmitLogin(e)}>
          <input
            type="email"
            onChange={(e) => setEmailLogin(e.target.value)}
            value={emailLogin}
            placeholder="Email"
            autoCorrect="off"
            autoCapitalize="off"
            className="w-full p-[10px] rounded-lg border-2 border[#003585]"
          />
          <input
            type="password"
            onChange={(e) => setPasswordLogin(e.target.value)}
            value={passwordLogin}
            autoCorrect="off"
            autoCapitalize="off"
            placeholder="Password"
            className="w-full p-[10px] rounded-lg mt-2 border-2 border[#003585]"
          />
          <div className="mt-2 flex justify-between font-semibold text-sm">
            <a
              className="text-[#003585] hover:text-blue-700 hover:underline hover:underline-offset-4"
              href="#"
            >
              Forgot Password?
            </a>
            <p id="error" className="text-[#ff0000]">
              {error}
            </p>
          </div>
          <div className="text-center md:text-left">
            <button
              className="w-full max-sm:w-[200px] p-[10px] mt-2 rounded-lg bg-[#003585] text-white border-0"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don't have an account?{" "}
          <a
            className="text-red-600 hover:underline hover:text-[#003585] hover:underline-offset-4"
            href="/signup"
          >
            Register
          </a>
        </div>
      </div>
    </section>
  );
}

export default Login;
