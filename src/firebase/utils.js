import { storage } from "./config";

export async function getImg(specificString) {
  const storageRef = storage.ref("images");

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
      const name = filteredImages[i].name;
      const collectionName =
        typeof name === "string" ? name.split("collection=")[1] : "";
      collections[i] = [downloadURLs[i], collectionName];
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
    if (imageList == null) return;

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
    console.log(downloadURLs);

    let collections = new Array(filteredImages.length);

    if (typeof filteredImages[0].name !== "string") return;
    for (var i = 0; i < collections.length; i++) {
      collections[i] = [
        downloadURLs[i],
        /* filteredImages[i].name.split("collection=")[1], */
      ];
    }
    // Return the filtered image URLs
    return collections;
  } catch (error) {
    console.log(error);
    return [];
  }
}
