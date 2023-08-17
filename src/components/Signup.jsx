import { useEffect, useState } from "react";
import { UserAuth } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Signup() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const { signUp, error } = UserAuth();

  const navigate = useNavigate();

  const onSubmitSignup = async (e) => {
    e.preventDefault();
    document.querySelector(".error").innerText = "";
    if (
      document.getElementById("confirm").value !=
      document.getElementById("password").value
    ) {
      document.getElementById("error").style.color = "#ff0000";
      document.getElementById("error").innerText = t("Passwords do not match!");
      return;
    } else await signUp(name, emailLogin, passwordLogin);
  };
  useEffect(() => {
    if (error == t("Verify Email Sent!")) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [error, navigate, t]);

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm shadow-2xl rounded-3xl">
        {/* <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        /> */}
        <img src="./login.png" className="rounded-3xl mt-10" alt="" />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left text-3xl font-logo text-[#003585]">
          fishtrack.
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <h1 className="px-3 font-semibold uppercase">{t("Signup")}</h1>
        </div>
        <form onSubmit={(e) => onSubmitSignup(e)}>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            maxLength={35}
            autoCorrect="off"
            autoCapitalize="on"
            className="w-full p-[10px] rounded-lg border-2 border[#003585]"
          />
          <input
            type="email"
            onChange={(e) => setEmailLogin(e.target.value)}
            value={emailLogin}
            placeholder="Email"
            autoCorrect="off"
            autoCapitalize="off"
            className="w-full p-[10px] rounded-lg mt-2 border-2 border[#003585]"
          />
          <input
            type="password"
            onChange={(e) => setPasswordLogin(e.target.value)}
            value={passwordLogin}
            autoCorrect="off"
            id="password"
            autoCapitalize="off"
            autoComplete="new-password"
            placeholder={t("Form Password")}
            className="w-full p-[10px] rounded-lg mt-2 border-2 border[#003585]"
          />
          <input
            type="password"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={t("Form Password Confirm")}
            id="confirm"
            className="w-full p-[10px] rounded-lg mt-2 border-2 border[#003585]"
          />
          <div className="mt-2 flex justify-between font-semibold text-sm">
            <p id="error" className="text-[#ff0000] error">
              {error}
            </p>
          </div>
          <div className="text-center md:text-left">
            <button
              className="w-full max-sm:w-[200px] p-[10px] mt-2 rounded-lg bg-[#003585] text-white border-0"
              type="submit"
            >
              {t("Signup")}
            </button>
          </div>
        </form>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          {t("Signup to Login")}{" "}
          <a
            className="text-red-600 hover:underline hover:text-[#003585] hover:underline-offset-4"
            href="/login"
          >
            Login
          </a>
        </div>
      </div>
    </section>
  );
}

export default Signup;
