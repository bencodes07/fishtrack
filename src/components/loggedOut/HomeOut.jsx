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
            <FiLogIn size={18} fontWeight={"bold"} className="mx-1" />
            <p className="mx-1 text-lg font-semibold">LOGIN</p>
          </button>
        </div>
      </nav>
      <main>
        <div className="flex justify-between">
          <div className=" relative top-[15vh] left-[7vw]">
            <h1 className="text-6xl font-semibold">Save Your</h1>
            <h1 className="text-6xl font-semibold text-[#0044AB]">
              Underwater
            </h1>
            <h1 className="text-6xl font-semibold">Memories</h1>
            <p className="max-w-[35vw] mt-3 text-[#7F7F7F]">
              There are many types of underwater creatures that you may have
              catched, so what are you waiting for let’s save them in
              <b> “fishtrack”</b>!
            </p>
          </div>
          <div>
            <img
              className="absolute w-[60vw] max-w-[800px] z-10 mt-[100px] right-0"
              src="./stingray.png"
              alt=""
            />
            <img
              className="relative top-[5vh] h-[648px]"
              src="./FishBg.png"
              alt=""
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default HomeOut;
