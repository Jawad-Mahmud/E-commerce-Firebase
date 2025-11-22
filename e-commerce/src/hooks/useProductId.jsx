import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config/firebase'

export const useProductId = (id) => {
    const [individual, setIndividual] = useState(null)
    useEffect(() => {
      if(!id) return;

          const fetchProduct = async () => {
      const docRef = doc(db, "watches", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setIndividual({ id: docSnap.id, ...docSnap.data() });
      }
    };

    fetchProduct();

    }, [id])
    
  return {individual}
}