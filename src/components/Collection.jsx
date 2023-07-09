import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getImgWithCollection } from "../firebase/utils";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { GrClose } from "react-icons/gr";
import { IoLocationSharp } from "react-icons/io5";
import { GiFishing } from "react-icons/gi";
import Loader from "./Loader";

function Collection() {
  const { name } = useParams();
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageSource, setImageSource] = useState("");
  const modal = useRef();
  const main = useRef();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;
      const fetchImages = async () => {
        setLoading(true);
        const images = await getImgWithCollection(user.uid, name);
        setFilteredImages(images);
        setLoading(false);
      };
      fetchImages();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClickOpen = (imageLink) => {
    setImageSource(imageLink);
    window.scrollTo(0, 0);
    modal.current.style.translate = "0%";
    document.body.style.overflow = "hidden";
  };
  const handleClickClose = () => {
    modal.current.style.translate = "100%";
    document.body.style.overflow = "visible";
  };
  return (
    <>
      <header className="h-[215px] select-none collectionBg drop-shadow-2xl text-white text-center bg-[#003585] flex justify-center items-center">
        <h1 className="relative top-5 uppercase text-6xl font-semibold tracking-[8px] leading-3 pt-12 px-[30px] py-[120px]">
          {name} <br></br>
          <span className="tracking-[7px] font-normal text-2xl relative top-10">
            [ Your Tracked Fish ]
          </span>
        </h1>
      </header>
      {loading && <Loader />}
      <main
        ref={main}
        className="relative left-[50%] translate-x-[-50%] min-h-[calc(100vh-215px)] w-screen grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 gap-6 pt-10 justify-items-center px-2 grid-flow-row gap-y-6"
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
                <p className="flex justify-start items-center">
                  <GiFishing size={24} className="mr-1" />
                  <p className=" font-bold">Catch Date:&nbsp;&nbsp;&nbsp;</p>

                  {imageSource.toString().match(/(\d{2})-(\d{2})-(\d{4})/)[0]}
                </p>
                <p className="flex justify-start items-center">
                  <IoLocationSharp size={24} className="mr-1" />
                  <p className=" font-bold">Location:&nbsp;&nbsp;&nbsp;</p>
                  {imageSource
                    .toString()
                    .match(/%7B(.*?)%7D/)[1]
                    .replace(/%20/g, " ")}
                </p>
              </div>
              <img
                src={imageSource}
                width={300}
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