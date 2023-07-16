import { storage } from "./config";

export async function getImg(specificString) {
  const storageRef = storage.ref(storage, "images");

  try {
    const imageList = await storageRef.listAll();

    // Filter the image files based on the specific string
    const filteredImages = imageList.items.filter((item) =>
      item.name.includes(specificString)
    );

    // Get the download URLs for the filtered images
    const downloadURLs = await Promise.all(
      filteredImages.map((image) => image.getDownloadURL())
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

export async function getImgWithCollection(userid, collection) {
  const storageRef = storage.ref("images");

  try {
    const imageList = await storageRef.listAll();

    // Filter the image files based on the specific string
    const filteredImages = imageList.items.filter(
      (item) =>
        item.name.includes(userid) &&
        item.name.split("collection=")[1] == collection
    );

    // Get the download URLs for the filtered images
    const downloadURLs = await Promise.all(
      filteredImages.map((image) => image.getDownloadURL())
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
