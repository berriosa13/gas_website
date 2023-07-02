import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from "../firebaseConfig";

function useInactiveListings() {
    const inactiveListingsQuery = query(collection(db, "Cars"), where("sold", "==", "Yes"));
    const [inactiveListings, setInactiveListings] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(inactiveListingsQuery, (querySnapshot) => {
      const listings = [];
      querySnapshot.forEach((doc) => {
        listings.push({ ...doc.data(), id: doc.id });
      });

      setInactiveListings(listings);
    });

    return () => {
      unsubscribe();
    };
  }, [inactiveListingsQuery]);

  return inactiveListings;
}

export default useInactiveListings;
