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

const Home = () => {
  const { t } = useTranslation();
  const { user } = UserAuth();

  const collectionNameInput = useRef();
  const locationInput = useRef();
  const dateInput = useRef();
  const typeInput = useRef();
  const weightInput = useRef();
  const lengthInput = useRef();

  const fileLoader = useRef();
  const [files, setFiles] = useState();
  const [preview, setPreview] = useState("");
  const [fileName, setFileName] = useState(t("No file selected"));

  const handleUpload = (e) => {
    e.preventDefault();
    if (user != null) {
      for (let i = 0; i < files.length; i++) {
        const date = dateInput.current.value;
        const dateArray = date.split("-");

        const year = dateArray[0];
        const month = dateArray[1];
        const day = dateArray[2];

        const regex = /^[A-Za-z0-9,./ ]+$/;

        if (
          !regex.test(collectionNameInput.current.value) ||
          !regex.test(locationInput.current.value) ||
          !regex.test(typeInput.current.value) ||
          !regex.test(weightInput.current.value) ||
          !regex.test(lengthInput.current.value)
        )
          return alert("No special characters please!");

        storage
          .ref(
            `images/${files[i].name}_${
              user.uid
            }_${uuidv4()}_${day}-${month}-${year}_{${
              locationInput.current.value
            }}_[${typeInput.current.value}]_(${weightInput.current.value})_$${
              lengthInput.current.value
            }$_collection=${collectionNameInput.current.value}`
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
  };
  useEffect(() => {
    if (window.innerWidth <= 640) {
      const now = new Date();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      const today = now.getFullYear() + "-" + month + "-" + day;
      dateInput.current.value = today;
    }
  }, []);

  if (user) {
    return (
      <>
        <Navbar loggedIn={true} email={user.email} />
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
                    className="flex justify-center items-center flex-col border-[#003585] border-dashed border-[3px] w-[400px] h-[320px] max-sm:w-[80vw] mt-3 rounded-lg cursor-pointer"
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
                        className="object-cover w-[calc(100%-20px)] h-[calc(100%-20px)]"
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
                <div className="flex justify-between items-center flex-col w-[400px] mt-3 md:ml-0 min-[850px]:ml-4 lg:ml-4 max-sm:ml-0 h-[370px]">
                  {window.innerWidth <= 640 ? (
                    <input
                      type="date"
                      name="dateInput"
                      className="w-full max-sm:w-[200px] px-[10px] py-[10px] rounded-lg border-2 border[#003585] max-h-[46.5px]"
                      ref={dateInput}
                      required
                    />
                  ) : (
                    <input
                      type="text"
                      name="dateInput"
                      placeholder={t("Catch Date")}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      className="w-full max-sm:w-[200px] px-[10px] py-[10px] rounded-lg border-2 max-h-[46.5px]"
                      ref={dateInput}
                      required
                    />
                  )}

                  <input
                    type="text"
                    name="locationInput"
                    placeholder={t("Catch Location")}
                    className="w-full max-sm:w-[200px] p-[10px] rounded-lg mt-2 border-2"
                    ref={locationInput}
                    required
                  />
                  <input
                    type="text"
                    name="typeInput"
                    placeholder={t("Fish Type")}
                    className="w-full max-sm:w-[200px] p-[10px] rounded-lg mt-2 border-2"
                    ref={typeInput}
                    required
                  />
                  <div className="flex justify-center items-center w-full h-full">
                    <input
                      type="number"
                      name="weightInput"
                      placeholder={t("Fish Weight")}
                      className="w-full max-sm:w-[200px] p-[10px] rounded-lg mt-2 border-2"
                      ref={weightInput}
                      required
                    />
                    <span className=" max-sm:ml-[150px] bg-transparent ml-[350px] absolute mt-2 text-[#7F7F7F]">
                      kg
                    </span>
                  </div>
                  <div className="flex justify-center items-center w-full h-full">
                    <input
                      type="number"
                      name="lengthInput"
                      placeholder={t("Fish Length")}
                      className="w-full max-sm:w-[200px] p-[10px] rounded-lg mt-2 border-2"
                      ref={lengthInput}
                      required
                    />
                    <span className=" max-sm:ml-[150px] bg-transparent ml-[350px] absolute mt-2 text-[#7F7F7F]">
                      cm
                    </span>
                  </div>

                  <input
                    type="text"
                    name="collectionInput"
                    ref={collectionNameInput}
                    placeholder={t("Folder")}
                    required
                    className="w-full max-sm:w-[200px] p-[10px] rounded-lg mt-2 border-2"
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
                className="fileLoadBar w-0 bg-[#003585] h-2 mt-3 rounded-lg transition-all"
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
