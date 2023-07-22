import { useState, useEffect } from "react";
import { getImg } from "../firebase/utils";
import { auth } from "../firebase/config";

function Gallery() {
  const [filteredImages, setFilteredImages] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) return;
      const fetchImages = async () => {
        const images = await getImg(user.uid);
        setFilteredImages(images);
        images.map((elem) => {
          collections.push(elem[1]);
        });
        removeDupes(collections);
      };
      fetchImages();
    });
  }, []);
  function removeDupes(arr) {
    var obj = {};
    var ret_arr = [];
    for (let i = 0; i < arr.length; i++) {
      obj[arr[i]] = true;
    }
    for (var key in obj) {
      ret_arr.push(key);
    }
    setCollections(ret_arr);
  }
  return (
    <>
      <div className="flex justify-start items-center flex-col mt-4 w-[70vw]">
        <h2 className="text-xl font-semibold">Your Folders</h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-2 gap-2 justify-center text-center">
          {collections.map((item, index) => (
            <div
              className="bg-[#003585] px-3 py-2 rounded-lg flex justify-center items-center max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis"
              key={index}
            >
              <a
                className="text-white hover:no-underline"
                href={"/collection/" + item}
              >
                {item}
              </a>
            </div>
          ))}
        </div>
        {collections.length === 0 && (
          <p className="text-[#7F7F7F]">You don't have any Folders.</p>
        )}
      </div>
    </>
  );
}

export default Gallery;
