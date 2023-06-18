import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export async function getImg(specificString) {
  const storageRef = ref(storage, "images");

  try {
    const imageList = await listAll(storageRef);

    // Filter the image files based on the specific string
    const filteredImages = imageList.items.filter((item) =>
      item.name.includes(specificString)
    );

    // Get the download URLs for the filtered images
    const downloadURLs = await Promise.all(
      filteredImages.map((image) => getDownloadURL(image))
    );

    let collections = new Array(filteredImages.length);

    for (var i = 0; i < collections.length; i++) {
      collections[i] = [
        downloadURLs[i],
        filteredImages[i].name.split("collection=")[1],
      ];
    }
    // Return the filtered image URLs
    console.log(collections);
    return collections;
  } catch (error) {
    console.log(error);
    return [];
  }
}
