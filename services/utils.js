import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

class utilMethods {
     getAllImages = async (carId) => {
        const images = [];
        const matchingImages = query(
          collection(db, "Image"),
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
              "Error getting snapshot data for Car collection: ",
              error
            );
          }
        );
        return images;
      };  
}

export default new utilMethods()