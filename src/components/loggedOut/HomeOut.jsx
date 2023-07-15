import { FaCompass } from "react-icons/fa";
import { BsRocketTakeoffFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

function HomeOut() {
  document.body.style.maxHeight = "100svh";
  const navigate = useNavigate();
  return (
    <>
      <div className="max-h-[100svh]">
        <Navbar />

        <main className="max-h-[calc(100svh-100px)]">
          <div className="flex justify-between h-[calc(100svh-100px)]">
            <div className="relative top-[15vh] max-lg:top-[5svh] max-h-[580px] max-lg:max-h-[100svh] left-[7vw] max-lg:left-[50%] max-lg:translate-x-[-50%] max-lg:text-center">
              <h1 className="text-6xl font-semibold overflow-hidden">
                Save Your
              </h1>
              <h1 className="text-6xl font-semibold text-[#0044AB] overflow-hidden">
                Underwater
              </h1>
              <h1 className="text-6xl font-semibold overflow-hidden">
                Memories
              </h1>
              <p className="max-w-[35vw] max-lg:max-w-sm mt-3 text-[#7F7F7F]">
                There are many types of underwater creatures that you may have
                catched, so what are you waiting for let’s save them in
                <b> “fishtrack”</b>!
              </p>
              <div className="flex justify-start max-lg:justify-center items-center mt-4">
                <button
                  onClick={() => navigate("/login")}
                  className="flex justify-center items-center rounded-full font-semibold bg-[#003585] text-white p-4 h-[48px]"
                >
                  <BsRocketTakeoffFill />
                  <p className="ml-2">Get Started</p>
                </button>
                <button
                  onClick={() =>
                    (window.location.href =
                      "https://github.com/bencodes07/fishtrack")
                  }
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
      <Footer />
    </>
  );
}

export default HomeOut;
