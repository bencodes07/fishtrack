import { useState, useEffect } from "react";
import { getImg } from "../firebase/utils";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

function Gallery() {
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;
      const fetchImages = async () => {
        const images = await getImg(user.uid);
        setFilteredImages(images);
      };
      fetchImages();
    });
  }, []);
  return (
    <div>
      {filteredImages.map((image, index) => (
        <div>
          <img key={index} width={100} src={image} alt={`Image ${index}`} />
          <p>{image[1]}</p>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
