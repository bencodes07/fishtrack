import React from "react";

function Footer() {
  return (
    <div className="bg-[#003585] w-screen h-[50px] absolute bottom-0 flex justify-evenly items-center">
      <h1 className="font-logo text-2xl text-[#fff]">fishtrack. </h1>{" "}
      <p className="text-white max-sm:hidden">© 2023 Copyright: Ben Böckmann</p>
    </div>
  );
}

export default Footer;
