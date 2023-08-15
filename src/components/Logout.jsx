import { UserAuth } from "../contexts/AuthContextProvider";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function Logout() {
  const { logOut } = UserAuth();
  const { t } = useTranslation();
  useEffect(() => {
    async function onload() {
      await logOut();
    }
    onload();
  }, [logOut]);

  return (
    <div className="text-3xl text-[#0044AB] font-bold text-center flex justify-center items-center w-screen h-screen flex-col">
      <p>{t("Successfully logged out!")}</p>
      <strong>{t("See you next time :)")}</strong>
      <a href="/" className="text-xl text-black mt-3">
        {t("Return Home")}
      </a>
    </div>
  );
}

export default Logout;
