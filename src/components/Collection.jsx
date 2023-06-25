import React from 'react'
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { getImgWithCollection } from "../firebase/utils";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

function Collection() {
  const { name } = useParams();
  const [filteredImages, setFilteredImages] = useState([]);
  const regex = /(\d{2})-(\d{2})-(\d{4})/;
  let match;
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
      <div>Collection <strong>{name}</strong></div>
      {filteredImages.map((image, index) => (
        <div key={index}>
          <img width={100} loading="lazy" src={image} alt={`Image ${index}`} />
          
          <p>{image.toString().match(regex)[0]}</p>
          
        </div>
      ))}
    </>
    
  )
}

export default Collection
