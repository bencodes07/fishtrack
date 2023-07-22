import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getImgWithCollection } from "../firebase/utils";
import { auth } from "../firebase/config";
import { GrClose } from "react-icons/gr";
import { IoLocationSharp } from "react-icons/io5";
import { GiFishing, GiWeight } from "react-icons/gi";
import { FaFishFins } from "react-icons/fa6";
import { TbRulerMeasure } from "react-icons/tb";
import Loader from "./Loader";

function Collection() {
  const { name } = useParams();
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageSource, setImageSource] = useState("");
  const modal = useRef();
  const main = useRef();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) return;
      const fetchImages = async () => {
        setLoading(true);
        const images = await getImgWithCollection(user.uid, name);
        setFilteredImages(images);
        setLoading(false);
      };
      fetchImages();
    });
    document.body.style.overflowX = "hidden";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClickOpen = (imageLink) => {
    setImageSource(imageLink);
    window.scrollTo(0, 0);
    modal.current.style.translate = "0%";
    document.body.style.overflow = "hidden";
    document.body.style.maxHeight = "100vh";
  };
  const handleClickClose = () => {
    modal.current.style.translate = "100%";
    document.body.style.overflow = "visible";
    document.body.style.maxHeight = "unset";
  };
  return (
    <>
      <header className="h-[215px] select-none collectionBg drop-shadow-2xl text-white text-center bg-[#003585] flex justify-center items-start w-[screen] overflow-hidden">
        <h1 className="relative flex justify-center items-center flex-col top-5 uppercase text-6xl font-semibold tracking-[8px] px-[30px] whitespace-break-spaces">
          {name} <br></br>
          <span className="tracking-[7px] font-normal text-2xl relative mt-10 h-fit">
            [ Your Tracks ]
          </span>
        </h1>
      </header>
      {loading && <Loader />}
      <main
        ref={main}
        className="relative left-[50%] translate-x-[-50%] min-h-[calc(100vh-215px)] w-[100svw] grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 gap-6 pt-10 justify-items-center px-4 grid-flow-row gap-y-6 max-sm:w-[calc(100vw-50px)] overflow-visible"
        style={{ maxWidth: "64rem" }}
      >
        {filteredImages.map((image, index) => (
          <a
            key={index}
            onClick={() => handleClickOpen(image)}
            className="collectionImage relative w-full flex justify-center aspect-[4/3] bg-center"
          >
            <img
              src={image}
              alt={`Image ${index}`}
              loading="lazy"
              className="object-center rounded-md min-w-full max-w-[80vw] cursor-pointer object-cover"
            />
          </a>
        ))}
        <div className="w-full flex justify-center">
          <img src="" alt="" />
        </div>
        <div
          ref={modal}
          style={{ translate: "100% 0%" }}
          className="absolute flex max-sm:flex-col-reverse justify-center items-center w-screen h-[calc(100vh-215px)] bg-white z-20 transition-all"
        >
          <button
            className="absolute top-10 right-10"
            onClick={handleClickClose}
          >
            <GrClose size={40} />
          </button>
          {imageSource && (
            <>
              <div className="flex justify-center flex-col items-left w-[40vw] text-xl max-sm:w-[75vw] max-sm:items-center ">
                <div className="flex justify-start items-center">
                  <GiFishing size={24} className="mr-1" />
                  <p className=" font-bold">Catch Date:&nbsp;&nbsp;&nbsp;</p>

                  {imageSource.toString().match(/(\d{2})-(\d{2})-(\d{4})/)[0]}
                </div>
                <div className="flex justify-start items-center">
                  <IoLocationSharp size={24} className="mr-1" />
                  <p className=" font-bold">Location:&nbsp;&nbsp;&nbsp;</p>
                  {imageSource
                    .toString()
                    .match(/%7B(.*?)%7D/)[1]
                    .replace(/%20/g, " ")}
                </div>
                <div className="flex justify-start items-center">
                  <FaFishFins size={24} className="mr-1" />
                  <p className=" font-bold">Fish Type:&nbsp;&nbsp;&nbsp;</p>
                  {imageSource
                    .toString()
                    .match(/%5B(.*?)%5D/)[1]
                    .replace(/%20/g, " ")}
                </div>
                <div className="flex justify-start items-center">
                  <GiWeight size={24} className="mr-1" />
                  <p className=" font-bold">Fish Weight:&nbsp;&nbsp;&nbsp;</p>
                  {imageSource.toString().match(/\(([^)]+)\)/)[1]}kg
                </div>
                <div className="flex justify-start items-center">
                  <TbRulerMeasure size={24} className="mr-1" />
                  <p className=" font-bold">Fish Length:&nbsp;&nbsp;&nbsp;</p>
                  {imageSource.toString().match(/%24(.*?)%24/)[1]}cm
                </div>
              </div>
              <img
                src={imageSource}
                width={300}
                loading="lazy"
                className="rounded-md w-[40vw] max-sm:mb-5 max-sm:w-[75vw]"
              />
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default Collection;
