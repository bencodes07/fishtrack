import React from 'react'
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { getImgWithCollection } from "../firebase/utils";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

function Collection() {
  const { name } = useParams();
  const [filteredImages, setFilteredImages] = useState([]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;
      const fetchImages = async () => {
        const images = await getImgWithCollection(user.uid, name);
        setFilteredImages(images);
      };
      fetchImages();
    });
  }, []);
  return (
    <>
      <div>Collection</div>
      <div>{name}</div>
      {filteredImages.map((image, index) => (
        <div key={index}>
          <img width={100} loading="lazy" src={image} alt={`Image ${index}`} />
        </div>
      ))}
    </>
    
  )
}

export default Collection
