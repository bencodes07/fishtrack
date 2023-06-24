import { useState, useEffect } from "react";
import { getImg } from "../firebase/utils";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

function Gallery() {
  const [filteredImages, setFilteredImages] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;
      const fetchImages = async () => {
        const images = await getImg(user.uid);
        setFilteredImages(images);
        images.map((elem) => {
          collections.push(elem[1]);
        })
        removeDupes(collections)
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
    setCollections(ret_arr)
  }
  return (
    <>
      {/* 
      <div>
        {filteredImages.map((image, index) => (
          <div key={index}>
            <img width={100} loading="lazy" src={image} alt={`Image ${index}`} />
            <p>{image[1]}</p>
          </div>
        ))}
      </div>
      */}
      <div className="flex" style={{display: "flex"}}>
        {collections.map((item, index) => (
          <div key={index} style={{marginRight: "20px"}}>
            <a href={"/collection/" + item}>{item}</a>
          </div>
        ))}
      </div>
    </>
  );
}

export default Gallery;
