import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from "../firebaseConfig";

function useFeaturedListings() {
  const featuredListingsQuery = query(
    collection(db, 'Cars'),
    where('featuredListing', '==', 'Yes')
  );
  const [featuredListings, setFeaturedListings] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(featuredListingsQuery, (querySnapshot) => {
      const listings = [];
      querySnapshot.forEach((doc) => {
        listings.push({ ...doc.data(), id: doc.id });
      });

      setFeaturedListings(listings);
    });

    return () => {
      unsubscribe();
    };
  }, [featuredListingsQuery]);

  return featuredListings;
}

export default useFeaturedListings;
