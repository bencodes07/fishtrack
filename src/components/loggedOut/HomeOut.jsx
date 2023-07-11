import { FiLogIn } from "react-icons/fi";
import { FaCompass } from "react-icons/fa";
import { BsRocketTakeoffFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function HomeOut() {
  const navigate = useNavigate();
  document.body.style.maxHeight = "100svh";
  return (
    <>
      <div className="max-h-[100svh]">
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
              <FiLogIn size={18} fontWeight={"bold"} className="mx-1" />
              <p className="mx-1 text-lg font-semibold">LOGIN</p>
            </button>
          </div>
        </nav>
        <main className="max-h-[calc(100svh-100px)]">
          <div className="flex justify-between">
            <div className="relative top-[15vh] max-h-[580px] left-[7vw]">
              <h1 className="text-6xl font-semibold overflow-hidden">
                Save Your
              </h1>
              <h1 className="text-6xl font-semibold text-[#0044AB] overflow-hidden">
                Underwater
              </h1>
              <h1 className="text-6xl font-semibold overflow-hidden">
                Memories
              </h1>
              <p className="max-w-[35vw] mt-3 text-[#7F7F7F]">
                There are many types of underwater creatures that you may have
                catched, so what are you waiting for let’s save them in
                <b> “fishtrack”</b>!
              </p>
              <div className="flex justify-start items-center mt-4">
                <button
                  onClick={() => navigate("/login")}
                  className="flex justify-center items-center rounded-full font-semibold bg-[#003585] text-white p-4 h-[48px]"
                >
                  <BsRocketTakeoffFill />
                  <p className="ml-2">Get Started</p>
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="flex justify-center items-center rounded-full border-[#003585] border-[3px] text-[#003585] p-2 px-4 h-[48px] font-semibold ml-3"
                >
                  <FaCompass />
                  <p className="ml-2">See more</p>
                </button>
              </div>
              <div className="flex justify-evenly items-center flex-row mt-10 w-full">
                <div className="w-24 flex justify-center items-center flex-col">
                  <h2 className="text-[#0044AB] text-4xl font-medium">10+</h2>
                  <p className="text-[#7F7F7F]">Users</p>
                </div>
                <div className=" h-28 w-[1px] bg-[#7F7F7F]"></div>
                <div className="w-24 flex justify-center items-center flex-col">
                  <h2 className="text-[#0044AB] text-4xl font-medium">20+</h2>
                  <p className="text-[#7F7F7F]">Locations</p>
                </div>
                <div className=" h-28 w-[1px] bg-[#7F7F7F]"></div>
                <div className="w-24 flex justify-center items-center flex-col">
                  <h2 className="text-[#0044AB] text-4xl font-medium">250+</h2>
                  <p className="text-[#7F7F7F]">Catches</p>
                </div>
              </div>
            </div>
            <div className=" max-lg:hidden">
              <img
                className="absolute w-[60vw] max-w-[800px] z-10 mt-[100px] right-0"
                src="./stingray.png"
                alt=""
              />
              <img className="relative" src="./FishBg.png" width={500} alt="" />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default HomeOut;
