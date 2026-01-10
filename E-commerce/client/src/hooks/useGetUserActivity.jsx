import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config/firebase';

export const useGetUserActivity = () => {
    const [getActivities, setGetActivities] = useState([]);
    useEffect(() => {

        const fetchActivities = async()=>{

                  try {
                
                const querySnapshot = await getDocs(collection(db,"userActivity"));
                const activities = querySnapshot.docs.map((doc)=>({
                  id: doc.id,
                  ...doc.data()
                }))
                console.log("users activities",activities);
                   setGetActivities(activities)
              }
              
           
            catch (err) {
              console.error("Error fetching data: ",err)
              
           }


        }

   fetchActivities();

    }, [])
    
  return {getActivities}
}
