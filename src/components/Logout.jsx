import { UserAuth } from "../contexts/AuthContextProvider";
import { useEffect } from "react";

function Logout() {
  const { logOut } = UserAuth();
  useEffect(() => {
    async function onload() {
      await logOut();
    }
    onload();
  }, []);

  return (
    <div className="text-3xl text-[#0044AB] font-bold text-center flex justify-center items-center w-screen h-screen flex-col">
      <p>Successfully logged out!</p>
      <strong>See you next time :)</strong>
      <a href="/" className="text-xl text-black mt-3">
        Return Home
      </a>
    </div>
  );
}

export default Logout;
