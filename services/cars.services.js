import { db } from '../firebaseConfig';

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp 
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

    setFavoriteImage = (carId, imageUrl) => {
        const carDoc = doc(carCollectionRef, carId);
        return updateDoc(carDoc, {
            thumbnailImage: imageUrl,
        })
    }
}

export default new CarDataService()