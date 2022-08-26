import { db } from "../firebaseConfig";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, deleteObject  } from "firebase/storage";

const imageCollectionRef = collection(db, "Image");
const storage = getStorage();

class ImageDataService {
  addImages = (newImage) => {
    return addDoc(imageCollectionRef, newImage);
  };

  updateImage = (id, updatedImage) => {
    const imageDoc = doc(db, "Image", id);
    return updateDoc(imageDoc, updatedImage);
  };

  deleteImageDocs = async (carId) => {
    const imageCollectionRef = collection(db, "Image");
    const matchingImagesQuery = query(
      imageCollectionRef,
      where("imageForeignId", "==", carId)
    );
    const querySnapshot = await getDocs(matchingImagesQuery);
    querySnapshot.forEach(async (doc) => {
        this.deleteImage(doc.id);
    });
  };

  deleteImageStorageById = async (carId) => {
    const matchingImagesQuery = query(imageCollectionRef, where('imageForeignId', '==', carId));
    const querySnapshot = await getDocs(matchingImagesQuery);
    querySnapshot.forEach(async (doc) => {
        const storageRef = ref(storage, `images/${doc.data().imageStorageName}`);
        deleteObject(storageRef).then(() => {
        }).catch((error) => {
          console.log("Error deleting image in deleteImage method ", error);
        });
    })
};

deleteImage = (id) => {
    const imagedoc = doc(db, "Image", id);
    return deleteDoc(imagedoc);
  };

  getAllImage = () => {
    return getDocs(imageCollectionRef);
  };

  getImage = (id) => {
    const imageDoc = doc(db, "Image", id);
    return getDoc(imageDoc);
  };
  
  updateImageForeignId = (carDocId, imageDocRef) => {
    console.log("Setting carDocId ", carDocId, " to imageForeignId");
    const imageDoc = doc(db, "Image", imageDocRef.id);
    updateDoc(imageDoc, {
      imageForeignId: carDocId,
    });
    console.log("updated imageDoc", imageDoc);
  };

  getAllListingImages = async (carId) => {
      const images = [];
      const matchingImages = query(
        imageCollectionRef,
        where("imageForeignId", "==", carId)
      );
      const querySnapshot = await getDocs(matchingImages);
      querySnapshot.forEach(
        (doc) => {
          images.push({
            ...doc.data(),
            id: doc.id,
            url: doc.imageUrl,
          });
        },
        (error) => {
          console.log(
            "Error getting images for listings with id of: ", carId,
            error
          );
        }
      );
      return images;
  }

}

export default new ImageDataService();
