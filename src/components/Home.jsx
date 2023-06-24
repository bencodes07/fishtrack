import { storage, auth } from "../firebase/config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Gallery from "./Gallery";
import { UserAuth } from "../contexts/AuthContextProvider";
import { useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const { user } = UserAuth();
  const { logOut } = UserAuth();
  const uploadRef = useRef();
  const collectionNameInput = useRef();

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
        const storageRef = ref(
          storage,
          `images/${files[i].name}_${user.uid}_${uuidv4()}collection=${collectionNameInput.current.value}`
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

  return (
    <>
      <nav>
        <p>Welcome Home</p>

        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <h4>Your Collections</h4>
      <div></div>

      <h2>Upload Image</h2>
      <form onSubmit={(e) => handleUpload(e)}>
        <input ref={uploadRef} type="file" />
        <input
          ref={collectionNameInput}
          type="text"
          name="collectionInput"
          id="collectionInput"
          required
        />

        <button type="submit">Upload</button>
      </form>

      <h2>Your gallery</h2>
      <div>
        <Gallery />
      </div>
    </>
  );
};

export default Home;
