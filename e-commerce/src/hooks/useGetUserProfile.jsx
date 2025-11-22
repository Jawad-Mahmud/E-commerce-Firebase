import React from 'react'
import { db } from '../firebase-config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const useGetUserProfile = async (uid) => {
  const docSnap = await getDoc(doc(db, "users", uid));
  if (docSnap.exists()) return docSnap.data();
  return null;
};
