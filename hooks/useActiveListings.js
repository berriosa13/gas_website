import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from "../firebaseConfig";

function useActiveListings() {
    const activeListingsQuery = query(collection(db, "Cars"), where("sold", "==", "No"));
    const [activeListings, setActiveListings] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(activeListingsQuery, (querySnapshot) => {
      const listings = [];
      querySnapshot.forEach((doc) => {
        listings.push({ ...doc.data(), id: doc.id });
      });

      setActiveListings(listings);
    });

    return () => {
      unsubscribe();
    };
  }, [activeListingsQuery]);

  return activeListings;
}

export default useActiveListings;
