import { storage, auth } from "../firebase/config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Gallery from "./CollectionList";
import HomeOut from "./loggedOut/HomeOut.jsx";
import { UserAuth } from "../contexts/AuthContextProvider";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./Navbar";
import { AiFillFileImage } from "react-icons/ai";
import { MdDelete, MdCloudUpload } from "react-icons/md";

const Home = () => {
  const { user } = UserAuth();
  const { logOut } = UserAuth();
  const uploadRef = useRef();
  const collectionNameInput = useRef();
  const locationInput = useRef();
  const dateInput = useRef();
  const [files, setFiles] = useState();
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("No file selected");

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();
    if (user != null) {
      for (let i = 0; i < files.length; i++) {
        const date = dateInput.current.value;
        const dateArray = date.split("-");

        const year = dateArray[0];
        const month = dateArray[1];
        const day = dateArray[2];

        const storageRef = ref(
          storage,
          `images/${files[i].name}_${
            user.uid
          }_${uuidv4()}_${day}-${month}-${year}_{${
            locationInput.current.value
          }}_collection=${collectionNameInput.current.value}`
        );
        const uploadTask = uploadBytesResumable(storageRef, files[i]);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log(snapshot);
          },
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref);
          }
        );
      }
    } else {
      alert("Not logged in!");
    }
  };
  useEffect(() => {
    console.log(files);
  }, [files]);

  if (user) {
    return (
      <>
        <Navbar loggedIn={true} email={user.email} />
        <main className="flex justify-start items-center flex-col min-h-[calc(100vh-100px)]">
          <div className="flex justify-center items-center flex-col">
            <h2 className="text-[#003585] font-medium text-2xl mt-6">
              Welcome back{" "}
              <strong>
                {user.displayName ? user.displayName : user.email}
              </strong>
            </h2>
            <hr className="w-36 mt-6" />
            <Gallery />
            <hr className="w-36 mt-6" />
            <h2 className="text-xl font-semibold mt-3">Upload</h2>
            <div>
              <form
                onSubmit={handleUpload}
                onClick={() => document.querySelector(".input-field").click()}
                className="flex justify-center items-center flex-col border-[#003585] border-dashed border-[3px] w-[400px] h-[200px] max-sm:w-[200px] mt-3 rounded-lg cursor-pointer"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="input-field"
                  hidden
                  onChange={(e) => {
                    setFiles(e.target.files[0]);
                    setFileName(e.target.files[0].name);
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }}
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
                    <p>Browse Files to upload</p>
                  </>
                )}
              </form>
              <section className="flex justify-between items-center mt-2 text-white rounded-lg bg-[#003585] py-[10px]">
                <AiFillFileImage className="ml-3" color="#ffffff" />
                <span className="upload-content flex justify-center items-center mr-3">
                  <p className="font-medium">{fileName} - </p>
                  <MdDelete
                    className=" cursor-pointer"
                    size={20}
                    onClick={() => {
                      setFileName("No file selected");
                      setPreview(null);
                      setFiles(null);
                    }}
                  />
                </span>
              </section>
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
      </>
    );
  } else {
    return <HomeOut />;
  }
};

export default Home;
