import React from "react";

function Footer() {
  const pageHeight = window.innerHeight;
  return (
    <div
      className="bg-[#003585] w-screen h-[50px] flex justify-evenly items-center"
      style={{ top: (pageHeight - 50).toString() + "px" }}
    >
      <h1 className="font-logo text-2xl text-[#fff]">fishtrack. </h1>{" "}
      <select name="langSelect" id="langSelect">
        <option value="german">Deutsch</option>
        <option value="english">English</option>
      </select>
      <p className="text-white max-sm:hidden ">
        © 2023 Copyright: Ben Böckmann
      </p>
    </div>
  );
}

export default Footer;
