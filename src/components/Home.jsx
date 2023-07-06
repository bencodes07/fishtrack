import { storage, auth } from "../firebase/config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Gallery from "./Gallery";
import HomeOut from "./loggedOut/HomeOut.jsx";
import { UserAuth } from "../contexts/AuthContextProvider";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const { user } = UserAuth();
  const { logOut } = UserAuth();
  const uploadRef = useRef();
  const collectionNameInput = useRef();
  const locationInput = useRef();
  const dateInput = useRef();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const files = uploadRef.current.files;
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

  if (user) {
    return (
      <>
        <nav>
          <p>
            Welcome Home <strong>{user.displayName}</strong>
          </p>

          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>

        <h2>Upload Image</h2>
        <form onSubmit={(e) => handleUpload(e)}>
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
        </form>

        <h2>Your Collections</h2>
        <div>
          <Gallery />
        </div>
      </>
    );
  } else {
    return <HomeOut />;
  }
};

export default Home;
