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
    orderBy
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

    updateCar = (id, updatedCar)=> {
        const carDoc = doc(carCollectionRef, id)
        return updateDoc(carDoc, updatedCar)
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

    getAllListings = async () => {
        const cars = [];
      
        try {
          const getAllListingsQuery = query(
            carCollectionRef,
            orderBy("createdAt"),
          );
          const querySnapshot = await getDocs(getAllListingsQuery);
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
}

export default new CarDataService()