import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Footer() {
  const pageHeight = window.innerHeight;

  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("id");

  useEffect(() => {
    const lng = navigator.language;
    if (lng == "de-DE") document.getElementById("german").selected = true;
    else document.getElementById("english").selected = true;
  }, []);
  const handleLangChange = (e) => {
    const lang = e.target.value;
    console.log(lang);
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };
  return (
    <div
      className="bg-[#003585] w-screen h-[50px] flex justify-evenly items-center"
      style={{ top: (pageHeight - 50).toString() + "px" }}
    >
      <h1 className="font-logo text-2xl text-[#fff]">fishtrack. </h1>{" "}
      <select
        className="bg-transparent border-2 border-#fff rounded-xl p-1 focus:border-2 text-white"
        name="langSelect"
        id="langSelect"
        onChange={handleLangChange}
      >
        <option value="de" id="german">
          Deutsch
        </option>
        <option value="en" id="english">
          English
        </option>
      </select>
      <p className="text-white max-sm:hidden ">
        © 2023 Copyright: Ben Böckmann
      </p>
    </div>
  );
}

export default Footer;
