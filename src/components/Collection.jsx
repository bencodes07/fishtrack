import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getImgWithCollection } from "../firebase/utils";
import { auth, storage } from "../firebase/config";
import { GrClose } from "react-icons/gr";
import { IoLocationSharp } from "react-icons/io5";
import { GiFishing, GiWeight, GiFishingHook } from "react-icons/gi";
import {
  FaFishFins,
  FaChevronDown,
  FaChevronUp,
  FaTemperatureHalf,
  FaCloudSun,
  FaArrowUpFromWaterPump,
} from "react-icons/fa6";
import { TbRulerMeasure } from "react-icons/tb";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BiText } from "react-icons/bi";
import Loader from "./Loader";
import Slider from "@mui/material/Slider";
import "rsuite/dist/rsuite.min.css";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) return;
      const fetchImages = async () => {
        setLoading(true);
        const images = await getImgWithCollection(user.uid, name);
        setFilteredImages(images);
        setOriginalImages(images);
        setLoading(false);
        console.log(images);
      };
      fetchImages();
    });
    document.body.style.overflowX = "hidden";
  }, [name]);
  const handleClickOpen = (imageLink) => {
    setImageSource(imageLink);
    window.scrollTo(0, 0);
    modal.current.style.translate = "0%";
    document.body.style.overflow = "hidden";
    document.body.style.maxHeight = "100vh";
    setFilterOpen(false);
    filterSection.current.style.height = "2.5rem";
    document.querySelector(".filterContent").style.display = "none";
    document.querySelector("header").style.display = "none";
    modal.current.style.minHeight = "100svh";
    main.current.style.minHeight = "100svh";
  };
  const handleClickClose = () => {
    modal.current.style.translate = "100%";
    document.querySelector("header").style.display = "flex";
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

  const handleDelete = () => {
    storage
      .refFromURL(imageSource)
      .delete()
      .then(() => {
        alert(t("Successful!"));
        window.location.reload(false);
      })
      .catch((error) => {
        console.error(error);
      });
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
            [ {t("Your Tracks")} ]
          </span>
        </h1>
      </header>
      <section className="h-10 transition-all" ref={filterSection}>
        <div className="filterContent hidden justify-center items-center flex-col h-[80%]">
          <div className="h-[full] flex justify-center items-center md:flex-row sm:flex-col max-sm:flex-col w-full gap-8">
            <div className="h-full md:w-[20%] sm:w-[60%] max-sm:w-[60%] flex justify-center items-center flex-col">
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

            <div className="h-full md:w-[20%] sm:w-[60%] max-sm:w-[60%] flex justify-center items-center flex-col">
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
            {t("Search")}
          </button>
          <button onClick={resetFilter} className="text-red-500 mt-1">
            {t("Reset")}
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
              <div className="flex justify-center flex-col items-left w-[40vw] text-xl max-sm:w-[75vw] ">
                <div className="flex justify-start items-center">
                  <GiFishing size={24} className="mr-1" />
                  <p className=" font-bold mr-1">{t("Catch Date")}:</p>

                  {imageSource
                    ?.toString()
                    .match(/(\d{2}-\d{2}-\d{4})\*(\d{2}%3A\d{2})/)[0]
                    .replace(/%3A/g, ":")
                    .replace("*", ", ")}
                </div>
                <div className="flex justify-start items-center">
                  <IoLocationSharp size={24} className="mr-1" />
                  <p className=" font-bold mr-1 min-w-fit">
                    {t("Catch Location")}:
                  </p>
                  {imageSource
                    ?.toString()
                    .match(/%7B(.*?)%7D/)[1]
                    .replace(/%20/g, " ")}
                </div>
                <div className="flex justify-start items-center">
                  <FaFishFins size={24} className="mr-1" />
                  <p className="mr-1 font-bold">{t("Fish Type")}:</p>
                  {imageSource
                    ?.toString()
                    .match(/%5B(.*?)%5D/)[1]
                    .replace(/%20/g, " ")}
                </div>
                <div className="flex justify-start items-center">
                  <GiWeight size={24} className="mr-1" />
                  <p className="mr-1 font-bold">{t("Fish Weight")}:</p>
                  {imageSource.toString().match(/\(([^)]+)\)/) != null
                    ? imageSource
                        .toString()
                        .match(/\(([^)]+)\)/)[1]
                        .replace(/%2C/g, ",") + "kg"
                    : "-"}
                </div>
                <div className="flex justify-start items-center">
                  <TbRulerMeasure size={24} className="mr-1" />
                  <p className="mr-1 font-bold">{t("Fish Length")}:</p>
                  {imageSource.toString().match(/%24(.*?)%24/)[1] != ""
                    ? imageSource
                        .toString()
                        .match(/%24(.*?)%24/)[1]
                        .replace(/%2C/g, ",") + "cm"
                    : "-"}
                </div>
                <div className="flex justify-start items-center">
                  <FaTemperatureHalf size={24} className="mr-1" />
                  <p className="mr-1 font-bold">{t("Temperature")}:</p>
                  {imageSource.toString().match(/%40(.*?)%40/)[1] != ""
                    ? imageSource
                        .toString()
                        .match(/%40(.*?)%40/)[1]
                        .replace(/%2C/g, ",") + "°C"
                    : "-"}
                </div>
                <div className="flex justify-start items-center">
                  <GiFishingHook size={24} className="mr-1" />
                  <p className="mr-1 font-bold">{t("Bait")}:</p>
                  {imageSource.toString().match(/!([^!]+)!/)[1] != ""
                    ? imageSource
                        .toString()
                        .match(/!([^!]+)!/)[1]
                        .replace(/%20/g, " ")
                    : "-"}
                </div>
                <div className="flex justify-start items-center">
                  <FaCloudSun size={24} className="mr-1" />
                  <p className="mr-1 font-bold">{t("Weather")}:</p>
                  {imageSource.toString().match(/%C2%A7(.*?)%C2%A7/)[1] != ""
                    ? imageSource.toString().match(/%C2%A7(.*?)%C2%A7/)[1]
                    : "-"}
                </div>
                <div className="flex justify-start items-center">
                  <FaArrowUpFromWaterPump size={24} className="mr-1" />
                  <p className="mr-1 font-bold">{t("Water Level")}:</p>
                  {imageSource.toString().match(/%3E(.*?)%3E/)[1] != ""
                    ? imageSource.toString().match(/%3E(.*?)%3E/)[1]
                    : "-"}
                </div>
                <div className="flex justify-start items-center">
                  <BiText size={24} className="mr-1" />
                  <p className="mr-1 font-bold min-w-fit">{t("Free Text")}:</p>
                  {imageSource
                    ?.toString()
                    .match(/%3C(.*?)%3C/)[1]
                    .replace(/%20/g, " ")}
                </div>
                <button
                  onClick={handleDelete}
                  className=" text-red-500 w-[50%] mt-2 flex justify-center items-center"
                >
                  <BsFillTrash3Fill className="mr-2" />
                  {t("Delete")}
                </button>
              </div>
              <img
                src={imageSource}
                loading="lazy"
                className="rounded-md max-w-[40vw] max-sm:mb-5 max-sm:w-[75vw] max-h-[70vh]"
              />
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default Collection;
