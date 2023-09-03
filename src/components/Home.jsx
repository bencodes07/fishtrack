import { storage } from "../firebase/config";
import Gallery from "./CollectionList";
import HomeOut from "./loggedOut/HomeOut.jsx";
import { UserAuth } from "../contexts/AuthContextProvider";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./Navbar";
import { AiFillFileImage } from "react-icons/ai";
import { MdDelete, MdCloudUpload } from "react-icons/md";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";
import { getImg } from "../firebase/utils";
import { auth } from "../firebase/config";
import DatePicker from "react-datepicker";
import "react-datepicker/src/stylesheets/datepicker.scss";
import { Input, SelectPicker } from "rsuite";

const Home = () => {
  const { t } = useTranslation();
  const { user } = UserAuth();

  const MAX_IMAGE_AMOUNT = 100;

  const dateInput = useRef();
  const locationInput = useRef();
  const typeInput = useRef();
  const weightInput = useRef();
  const lengthInput = useRef();
  const tempInput = useRef();
  const baitInput = useRef();
  const weatherInput = useRef();
  const waterInput = useRef();
  const textInput = useRef();
  const collectionNameInput = useRef();

  const fileLoader = useRef();
  const [files, setFiles] = useState();
  const [preview, setPreview] = useState("");
  const [fileName, setFileName] = useState(t("No file selected"));
  const [date, setDate] = useState(null);
  const [weatherVal, setWeatherVal] = useState(null);
  const [waterVal, setWaterVal] = useState(null);

  const [imageAmount, setImageAmount] = useState(0);

  const weatherData = [
    t("Sunny"),
    t("Cloudy"),
    t("Rainy"),
    t("Foggy"),
    t("Snowy"),
  ].map((item) => ({
    label: item,
    value: item,
  }));

  const waterData = [t("High"), t("Medium"), t("Low")].map((item) => ({
    label: item,
    value: item,
  }));

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) return;
      const fetchImages = async () => {
        const images = await getImg(user.uid);

        setImageAmount(images.length);
      };
      fetchImages();
    });
  }, [imageAmount]);

  const handleUpload = (e) => {
    if (imageAmount >= MAX_IMAGE_AMOUNT && user.isAnonymous == false) {
      console.log(imageAmount);
      alert("Please subscribe first");
    } else {
      e.preventDefault();
      if (user != null) {
        for (let i = 0; i < files.length; i++) {
          /* console.log(date);
          const dateArr = date.split("/");

          const year = dateArr[0].split("-")[0];
          const month = dateArr[0].split("-")[1];
          const day = dateArr[0].split("-")[2];

          console.log(dateArr); */

          const dateObject = new Date(date);

          // Format the date
          const day = String(dateObject.getDate()).padStart(2, "0");
          const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are 0-based
          const year = dateObject.getFullYear();
          const formattedDate = `${day}-${month}-${year}`;

          // Format the time
          const hours = String(dateObject.getHours()).padStart(2, "0");
          const minutes = String(dateObject.getMinutes()).padStart(2, "0");
          const formattedTime = `${hours}:${minutes}`;

          const regex = /^[A-Za-z0-9,.: ]*$/;
          const collectionRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
          if (
            !regex.test(locationInput.current.value) ||
            !regex.test(typeInput.current.value) ||
            !regex.test(weightInput.current.value) ||
            !regex.test(lengthInput.current.value) ||
            !regex.test(baitInput.current.value) ||
            !regex.test(tempInput.current.value) ||
            !regex.test(textInput.current.value)
          )
            return alert(t("No special characters please!"));
          if (!collectionRegex.test(collectionNameInput.current.value))
            return alert(
              t("No spaces at the starts or end of a string please!")
            );
          storage
            .ref(
              `images/${files[i].name}_${
                user.uid
              }_${uuidv4()}_${formattedDate}*${formattedTime}_{${
                locationInput.current.value
              }}_[${typeInput.current.value}]_(${weightInput.current.value})_$${
                lengthInput.current.value
              }$_!${baitInput.current.value}!_§${weatherVal}§_>${waterVal}>_@${
                tempInput.current.value
              }@_<${textInput.current.value}<_collection=${
                collectionNameInput.current.value
              }`
            )
            .put(files[i])
            .on(
              "state_changed",
              (snapshot) => {
                console.log(snapshot);
                fileLoader.current.style.width =
                  (
                    (snapshot.bytesTransferred / snapshot.totalBytes) *
                    100
                  ).toString() + "%";
              },
              (error) => {
                alert(error);
              }
            );
        }
      } else {
        alert("Please log in first!");
      }
    }
  };

  if (user) {
    return (
      <>
        <Navbar loggedIn={true} name={user.displayName} />
        <main className="flex justify-start items-center flex-col min-h-[calc(100vh-100px)]">
          <div className="flex justify-center items-center flex-col">
            <h2 className="text-[#003585] font-medium text-2xl mt-6 w-[80vw] flex justify-center items-center sm:flex-row max-sm:flex-col">
              {t("Welcome back")}{" "}
              <strong className="ml-2">
                {user.displayName ? user.displayName : user.email}
              </strong>
            </h2>
            <hr className="w-36 mt-6" />
            <Gallery />
            <hr className="w-36 mt-6" />
            <h2 className="text-xl font-semibold mt-3">{t("Upload")}</h2>
            <div>
              <form
                onSubmit={handleUpload}
                className="flex justify-center items-center max-[850px]:flex-col"
              >
                <div>
                  <div
                    onSubmit={handleUpload}
                    onClick={() =>
                      document.querySelector(".input-field").click()
                    }
                    className="flex justify-center items-center flex-col border-[#003585] border-dashed border-[3px] w-[400px] h-[480px] max-sm:w-[80vw] mt-3 rounded-lg cursor-pointer"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="input-field"
                      hidden
                      onChange={(e) => {
                        setFiles(e.target.files);
                        setFileName(e.target.files[0].name);
                        setPreview(
                          e.target.files
                            ? URL.createObjectURL(e.target.files[0])
                            : ""
                        );
                      }}
                      required
                    />

                    {files && (
                      <img
                        src={preview}
                        width={150}
                        height={150}
                        alt={fileName}
                        className="object-contain w-[calc(100%-20px)] h-[calc(100%-20px)]"
                      />
                    )}

                    {!files && (
                      <>
                        <MdCloudUpload
                          className="cursor-pointer"
                          color="#003585"
                          size={60}
                        />
                        <p>{t("Browse Files")}</p>
                      </>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-2 text-white rounded-lg bg-[#003585] py-[10px]">
                    <AiFillFileImage className="ml-3" color="#ffffff" />
                    <span className="upload-content flex justify-center items-center mr-3">
                      <p className="font-medium">{fileName} - </p>
                      <MdDelete
                        className=" cursor-pointer"
                        size={20}
                        onClick={() => {
                          setFileName(t("No file selected"));
                          setPreview("");
                          setFiles(null);
                        }}
                      />
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center flex-col w-[400px] mt-3 md:ml-0 min-[850px]:ml-4 lg:ml-4 max-sm:ml-0 gap-2">
                  {/* {window.innerWidth <= 640 ? (
                      <DatePicker />
                  ) : (
                    <DatePicker />
                  )} */}
                  <div className="w-full z-20 flex justify-center items-center h-[36px] overflow-hidden">
                    <DatePicker
                      ref={dateInput}
                      showTimeSelect
                      dateFormat={"dd-MM-yyyy"}
                      autoComplete="off"
                      selected={date}
                      onChange={(selectedDate) => setDate(selectedDate)}
                      placeholderText={t("Catch Date")}
                      className="w-[400px] max-sm:w-[200px] border h-[36px] rounded-lg pl-2 mt-1"
                    />
                  </div>

                  <Input
                    type="text"
                    name="locationInput"
                    placeholder={t("Catch Location")}
                    className="w-full max-sm:w-[200px] rounded-lg"
                    ref={locationInput}
                  />
                  <Input
                    type="text"
                    name="typeInput"
                    placeholder={t("Fish Type")}
                    className="w-full max-sm:w-[200px] rounded-lg"
                    ref={typeInput}
                    required
                  />
                  <div className="flex justify-center items-center w-full h-full">
                    <Input
                      type="text"
                      pattern="^[0-9,\.]*$"
                      name="weightInput"
                      placeholder={t("Fish Weight")}
                      className="w-full max-sm:w-[200px] rounded-lg"
                      ref={weightInput}
                    />
                    <span className=" max-sm:ml-[150px] bg-transparent ml-[350px] absolute text-[#7F7F7F]">
                      kg
                    </span>
                  </div>

                  <div className="flex justify-center items-center w-full h-full">
                    <Input
                      type="text"
                      pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]"
                      name="lengthInput"
                      placeholder={t("Fish Length")}
                      className="w-full max-sm:w-[200px] rounded-lg"
                      ref={lengthInput}
                    />
                    <span className=" max-sm:ml-[150px] bg-transparent ml-[350px] absolute text-[#7F7F7F]">
                      cm
                    </span>
                  </div>

                  <div className="flex justify-center items-center w-full h-full">
                    <Input
                      placeholder={"Temperature"}
                      type="text"
                      pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]"
                      ref={tempInput}
                      className="w-full max-sm:w-[200px] rounded-lg"
                    />
                    <span className=" max-sm:ml-[150px] bg-transparent ml-[350px] absolute text-[#7F7F7F]">
                      °C
                    </span>
                  </div>

                  <Input
                    type="text"
                    ref={baitInput}
                    placeholder="Bait"
                    className="w-full max-sm:w-[200px] rounded-lg"
                  />

                  <div className="w-full max-sm:translate-x-1/4">
                    <SelectPicker
                      ref={weatherInput}
                      data={weatherData}
                      className="w-full max-sm:w-[200px] rounded-lg"
                      placeholder="Weather"
                      searchable={false}
                      block
                      value={weatherVal}
                      onChange={setWeatherVal}
                    />
                  </div>

                  <div className="w-full max-sm:translate-x-1/4">
                    <SelectPicker
                      data={waterData}
                      ref={waterInput}
                      className="w-full max-sm:w-[200px] rounded-lg"
                      placeholder="Water Level"
                      searchable={false}
                      block
                      value={waterVal}
                      onChange={setWaterVal}
                    />
                  </div>

                  <Input
                    type="text"
                    ref={textInput}
                    placeholder="Free Text"
                    className="w-full max-sm:w-[200px] rounded-lg"
                  />

                  <Input
                    type="text"
                    ref={collectionNameInput}
                    placeholder={t("Folder")}
                    required
                    className="w-full max-sm:w-[200px] rounded-lg"
                  />
                  <button
                    className="w-full max-sm:w-[200px] mt-2 p-[10px] rounded-lg bg-[#003585] text-white border-0"
                    type="submit"
                  >
                    {t("Upload")}
                  </button>
                </div>
              </form>
              <div
                ref={fileLoader}
                className="fileLoadBar w-0 bg-green-400 h-2 mt-3 rounded-lg transition-all"
              ></div>
            </div>

            {/* <div>
              <button onClick={handleLogout}>Logout</button>
            </div> */}
          </div>
          {/* <form onSubmit={(e) => handleUpload(e)}>
            <input ref={uploadRef} type="file" required />
            <input ref={dateInput} required type="date" />
            <input
              ref={collectionNameInput}
              type="text"
              name="collectionInput"
              id="collectionInput"
              placeholder="Collection"
              required
            />
            <input
              type="text"
              ref={locationInput}
              required
              placeholder="Location"
            />

            <button type="submit">Upload</button>
          </form> */}
        </main>
        <Footer />
      </>
    );
  } else {
    return <HomeOut />;
  }
};

export default Home;
