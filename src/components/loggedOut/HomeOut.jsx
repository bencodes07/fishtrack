import { FaCompass } from "react-icons/fa";
import { BsRocketTakeoffFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../Navbar";
import Footer from "../Footer";

function HomeOut() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="max-h-[100svh]">
        <Navbar />

        <main className="max-h-[calc(100svh-100px)]">
          <div className="flex justify-between h-[calc(100svh-100px)] overflow-hidden ">
            <div className="relative top-[15vh] max-lg:top-[5svh] max-lg:max-h-[100svh] left-[7vw] max-lg:left-[50%] max-lg:translate-x-[-50%] max-lg:text-center overflow-hidden">
              <h1 className="text-6xl font-semibold overflow-hidden">
                {t("Start Heading 1")}
              </h1>
              <h1 className="text-6xl font-semibold text-[#0044AB] overflow-hidden">
                {t("Start Heading 2")}
              </h1>
              <h1 className="text-6xl font-semibold overflow-hidden">
                {t("Start Heading 3")}
              </h1>
              <p className="max-w-[35vw] max-lg:max-w-sm mt-3 text-[#7F7F7F]">
                {t("Start Text")}
              </p>
              <div className="flex justify-start max-lg:justify-center items-center mt-4">
                <button
                  onClick={() => navigate("/signup")}
                  className="flex justify-center items-center rounded-full font-semibold bg-[#003585] text-white p-4 h-[48px]"
                >
                  <BsRocketTakeoffFill />
                  <p className="ml-2">{t("Start Button Get Started")}</p>
                </button>
                <button
                  onClick={() =>
                    (window.location.href =
                      "https://github.com/bencodes07/fishtrack")
                  }
                  className="flex justify-center items-center rounded-full border-[#003585] border-[3px] text-[#003585] p-2 px-4 h-[48px] font-semibold ml-3"
                >
                  <FaCompass />
                  <p className="ml-2">{t("Start Button See More")}</p>
                </button>
              </div>
              <div className="flex justify-evenly items-center flex-row mt-10 w-full">
                <div className="w-24 flex justify-center items-center flex-col">
                  <h2 className="text-[#0044AB] text-4xl font-medium overflow-hidden">
                    10+
                  </h2>
                  <p className="text-[#7F7F7F]">{t("Start Users")}</p>
                </div>
                <div className=" h-28 w-[1px] bg-[#7F7F7F]"></div>
                <div className="w-24 flex justify-center items-center flex-col">
                  <h2 className="text-[#0044AB] text-4xl font-medium overflow-hidden">
                    20+
                  </h2>
                  <p className="text-[#7F7F7F]">{t("Start Locations")}</p>
                </div>
                <div className=" h-28 w-[1px] bg-[#7F7F7F]"></div>
                <div className="w-24 flex justify-center items-center flex-col">
                  <h2 className="text-[#0044AB] text-4xl font-medium overflow-hidden">
                    250+
                  </h2>
                  <p className="text-[#7F7F7F]">{t("Start Images")}</p>
                </div>
              </div>
            </div>
            <div className="max-lg:hidden h-fit">
              {/* <img
                className="absolute w-[60vw] max-w-[800px] z-10 right-0"
                src="./stingray.png"
                alt=""
                style={{
                  marginTop: document.documentElement.scrollTop + 100 + "px",
                }}
              />
              <img className="relative" src="./FishBg.png" width={500} alt="" /> */}
              <img
                src="./home.png"
                alt=""
                className="relative top-[-150px]"
                width={800}
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default HomeOut;
