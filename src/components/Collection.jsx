import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getImgWithCollection } from "../firebase/utils";
import { auth } from "../firebase/config";
import { GrClose } from "react-icons/gr";
import { IoLocationSharp } from "react-icons/io5";
import { GiFishing, GiWeight } from "react-icons/gi";
import { FaFishFins, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { TbRulerMeasure } from "react-icons/tb";
import Loader from "./Loader";
import Slider from "@mui/material/Slider";
import "rsuite/dist/rsuite.min.css";

function Collection() {
  const { name } = useParams();
  const [filteredImages, setFilteredImages] = useState([]);
  const [originalImages, setOriginalImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageSource, setImageSource] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const modal = useRef();
  const main = useRef();
  const filterSection = useRef();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) return;
      const fetchImages = async () => {
        setLoading(true);
        const images = await getImgWithCollection(user.uid, name);
        setFilteredImages(images);
        setOriginalImages(images);
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
    setFilterOpen(false);
    filterSection.current.style.height = "2.5rem";
    document.querySelector(".filterContent").style.display = "none";
  };
  const handleClickClose = () => {
    modal.current.style.translate = "100%";
    document.body.style.overflow = "visible";
    document.body.style.maxHeight = "unset";
  };
  const [rangeWeight, setRangeWeight] = useState([5, 50]);
  const [rangeLength, setRangeLength] = useState([30, 55]);
  function handleChangesWeight(event, newValue) {
    setRangeWeight(newValue);
  }
  function handleChangesLength(event, newValue) {
    setRangeLength(newValue);
  }
  const handleFilter = () => {
    if (filterOpen) {
      setFilterOpen(false);
      filterSection.current.style.height = "2.5rem";
      document.querySelector(".filterContent").style.display = "none";
    } else {
      setFilterOpen(true);
      filterSection.current.style.height = "300px";
      document.querySelector(".filterContent").style.display = "flex";
    }
  };

  const handleSearch = () => {
    const filteredData = originalImages.filter(() => {
      return (
        originalImages.toString().match(/\(([^)]+)\)/)[1] >= rangeWeight[0] &&
        originalImages.toString().match(/\(([^)]+)\)/)[1] <= rangeWeight[1] &&
        originalImages.toString().match(/%24(.*?)%24/)[1] >= rangeLength[0] &&
        originalImages.toString().match(/%24(.*?)%24/)[1] <= rangeLength[1]
      );
    });
    setFilteredImages(filteredData);
  };
  const resetFilter = () => {
    setFilteredImages(originalImages);
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
      <section className="h-10 transition-all" ref={filterSection}>
        <div className="filterContent hidden justify-center items-center flex-col h-[80%]">
          <div className="h-[full] flex justify-center items-center flex-row w-full gap-8">
            <div className="h-full w-[20%] flex justify-center items-center flex-col">
              {" "}
              <Slider
                value={rangeWeight}
                onChange={handleChangesWeight}
                valueLabelDisplay="on"
                className="h-10 slider"
                id="weightSlider"
                max={75}
                color="secondary"
              />
              {rangeWeight[0]}kg - {rangeWeight[1]}kg
            </div>

            <div className="h-full w-[20%] flex justify-center items-center flex-col">
              {" "}
              <Slider
                value={rangeLength}
                onChange={handleChangesLength}
                valueLabelDisplay="on"
                className="h-10 slider"
                id="lengthSlider"
                max={200}
                color="secondary"
              />
              {rangeLength[0]}cm - {rangeLength[1]}cm
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="bg-[#003585] text-white p-2 rounded-xl px-3"
          >
            Search
          </button>
          <button onClick={resetFilter} className="text-red-500 mt-1">
            Reset
          </button>
        </div>
        <p
          className="filterLink text-xl text-[#3b3b3b] flex justify-center items-center hover:underline cursor-pointer "
          onClick={handleFilter}
        >
          Filter{" "}
          {filterOpen ? (
            <FaChevronUp className="ml-1" size={14} />
          ) : (
            <FaChevronDown className="ml-1" size={14} />
          )}
        </p>
      </section>
      {loading && <Loader />}
      <main
        className="relative left-[50%] translate-x-[-50%] min-h-[calc(100vh-215px)] w-[100svw] grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 gap-6 pt-2 justify-items-center px-4 grid-flow-row gap-y-6 max-sm:w-[calc(100vw-50px)] overflow-visible"
        style={{ maxWidth: "64rem" }}
        ref={main}
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
          className="absolute flex max-sm:flex-col-reverse justify-center items-center w-screen h-[calc(100vh-215px)] bg-white z-20 transition-all mt-[-2.5rem]"
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
