import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useContextMenu, ContextMenuItem } from "use-context-menu";
import "use-context-menu/styles.css";
import { UserAuth } from "../contexts/AuthContextProvider";
import { useTranslation } from "react-i18next";

function Navbar(props) {
  const { t } = useTranslation();
  const { user, forgetPasswordHome } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    window.location.href = "https://fishtrack.net/logout";
  };
  const handleHome = () => {
    window.location.href = "https://fishtrack.net";
  };
  const handlePasswordReset = () => {
    forgetPasswordHome(user.email);
  };
  const handlePremium = () => {
    alert("This feature is not implemented");
  };
  const {
    contextMenu: contextMenu,
    onContextMenu: onClick,
    onKeyDown,
  } = useContextMenu(
    <>
      <ContextMenuItem onSelect={handleHome}>{t("Home")}</ContextMenuItem>
      <ContextMenuItem onSelect={handlePasswordReset}>
        {t("Form Forgot Password")}
      </ContextMenuItem>
      <ContextMenuItem onSelect={handlePremium}>Premium</ContextMenuItem>
      <ContextMenuItem
        onSelect={handleLogout ? handleLogout : null}
        className=" text-red-500"
      >
        Logout
      </ContextMenuItem>
    </>
  );

  return (
    <nav className="flex justify-between items-center w-screen h-[100px] select-none">
      <div className="flex justify-end w-[10vw] min-w-fit ml-[5vw]">
        <h1 className="font-logo text-4xl text-[#003585] select-text">
          fishtrack.
        </h1>
      </div>
      <div>
        <ul className="flex text-lg w-[30vw] max-w-[440px] justify-evenly items-center list-none max-lg:w-[35vw] ">
          <li className="">
            <a
              className="max-sm:hidden text-black hover:no-underline hover:text-black hover:font-medium transition-all uppercase"
              href="/"
            >
              {t("Home")}
            </a>
          </li>
          {/* <li className=" text-[#7F7F7F]">
            <a
              className="max-sm:hidden hover:no-underline hover:text-black hover:font-medium transition-all"
              href="#"
            >
              FRIENDS
            </a>
          </li> */}
          <li className="text-[#7F7F7F]">
            <a
              className="max-sm:hidden hover:no-underline hover:text-black hover:font-medium transition-all cursor-pointer uppercase"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                } catch (err) {
                  alert(
                    "Failed to copy link to clipboard, check your browser settings!"
                  );
                }
              }}
            >
              {t("Invite")}
            </a>
          </li>
          <li className="text-[#7F7F7F]">
            <a
              className="max-sm:hidden hover:no-underline hover:text-black hover:font-medium transition-all uppercase"
              href=""
              onClick={handlePremium}
            >
              Premium
            </a>
          </li>
        </ul>
      </div>
      <div className="w-[10vw] mr-[5vw] flex justify-start min-w-fit">
        {!props.loggedIn && (
          <button
            onClick={() => navigate("/login")}
            className="flex justify-center items-center rounded-full border-[#003585] border-2 text-[#003585] p-2"
          >
            <FiLogIn size={18} fontWeight={"bold"} className="mx-1" />
            <p className="mx-1 text-lg font-semibold">LOGIN</p>
          </button>
        )}
        {props.loggedIn && (
          <button
            onContextMenu={onClick}
            onKeyDown={onKeyDown}
            onClick={onClick}
            /* href="/logout" */
            className="bg-[#003585] h-10 w-10  rounded-full flex justify-center items-center"
          >
            {contextMenu}
            <p className="text-white w-min h-min font-bold uppercase">
              {user.displayName ? user.displayName.charAt(0) : ""}
            </p>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
