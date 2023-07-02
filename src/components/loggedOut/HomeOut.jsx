import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function HomeOut() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex justify-between items-center w-screen h-[100px]">
        <div className="flex justify-end w-[10vw] min-w-fit ml-[5vw]">
          <h1 className="font-logo text-4xl text-[#003585]">fishtrack.</h1>
        </div>
        <div>
          <ul className="flex text-lg w-[30vw] max-w-[440px] justify-between items-center list-none max-lg:w-[35vw]">
            <li className="">
              <a
                className="text-black hover:no-underline hover:text-black hover:font-medium transition-all"
                href="#"
              >
                HOME
              </a>
            </li>
            <li className=" text-[#7F7F7F]">
              <a
                className="hover:no-underline hover:text-black hover:font-medium transition-all"
                href="#"
              >
                FRIENDS
              </a>
            </li>
            <li className="text-[#7F7F7F]">
              <a
                className="hover:no-underline hover:text-black hover:font-medium transition-all"
                href="#"
              >
                INVITE
              </a>
            </li>
          </ul>
        </div>
        <div className="w-[10vw] mr-[5vw] flex justify-start min-w-fit">
          <button
            onClick={() => navigate("/login")}
            className="flex justify-center items-center rounded-full border-[#003585] border-2 text-[#003585] p-2"
          >
            <FiLogIn size={18} className="mx-1" />
            <p className="mx-1 text-lg">LOGIN</p>
          </button>
        </div>
      </nav>
    </>
  );
}

export default HomeOut;
