import { db } from '../firebaseConfig'

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp, 
    deleteField,
    query,
    where,
    orderBy,
    onSnapshot
  } from "firebase/firestore";

const carCollectionRef = collection(db, "Cars")

class CarDataService {

    addCars = (newCar) => {
        newCar.createdAt = serverTimestamp();
        return addDoc(carCollectionRef, newCar)
    };

    addCreatedTimestamp = (id) => {
        const docRef = doc(carCollectionRef, id);
        return updateDoc(docRef, {
            createdAt: serverTimestamp()
        })
    }

    updateCar = async (id, updatedCar) => {
      const carDoc = doc(carCollectionRef, id)
      if(updatedCar.sold === 'Yes') {
        updatedCar.dateSold = serverTimestamp();
        return updateDoc(carDoc, updatedCar)
      } else if(updatedCar.sold === 'No' && updatedCar?.dateSold != '') {
        // Listing has been marked as sold previously, but then made active again
        await updateDoc(carDoc, { 
            dateSold: deleteField()
        });
        return updateDoc(carDoc, updatedCar,)
      } else {
        const carDoc = doc(carCollectionRef, id)
        return updateDoc(carDoc, updatedCar)
      }
    };

    deleteCar = (id) => {
        const carDoc = doc(carCollectionRef, id)
        return deleteDoc(carDoc)
    };

    getAllCars = () => {
        return getDocs(carCollectionRef)
    };

    getCar = (id) => {
        const carDoc = doc(db, "Cars", id)
        return getDoc(carDoc)
    };

    setThumbnailImage = (carId, imageUrl) => {
        const carDoc = doc(carCollectionRef, carId);
        return updateDoc(carDoc, {
            thumbnailImage: imageUrl,
        })
    }

    deleteThumbnailImageField = (carId) => {
        try {
            const docRef = doc(carCollectionRef, carId);
            updateDoc(docRef, { 
                thumbnailImage: deleteField()
            });

        } catch(err) {
            console.error("Error deleting thumbnail image ", err);
        }
    }

    getAllFeaturedListings = async () => {
        const cars = [];
        try {
          const getAllFeaturedListingsQuery = query(
            carCollectionRef,
            where('sold', '==', 'No'),
            where('featuredListing', '==', 'Yes'),
          );
          const querySnapshot = await getDocs(getAllFeaturedListingsQuery);
          querySnapshot.forEach(
            (doc) => {
              cars.push({
                ...doc.data(),
                id: doc.id,
                createdAt: doc.data().createdAt.toDate().getTime(),
              });
            },
          );
        } catch(err) {
          console.log("Error getting static props in cars.js: ", err);
        }
        return cars;
    }

    getAllActiveListings = async () => {
        const cars = [];
        try {
          const getAllActiveListingsQuery = query(
            carCollectionRef,
            where('sold', '==', 'No'),
            orderBy("createdAt"));
          const querySnapshot = await getDocs(getAllActiveListingsQuery);
          querySnapshot.forEach(
            (doc) => {
              cars.push({
                ...doc.data(),
                id: doc.id,
                createdAt: doc.data().createdAt.toDate().getTime(),
              });
            },
          );
        } catch(err) {
          console.log("Error getting static props in cars.js: ", err);
        }
        return cars;
    }

    removeDateSoldField = (id) => {
      try {
        const docRef = doc(carCollectionRef, id);
        updateDoc(docRef, { 
            dateSold: deleteField()
        });

      } catch(err) {
          console.error("Error deleting dateSold field ", err);
      }
    }
}

export default new CarDataService()