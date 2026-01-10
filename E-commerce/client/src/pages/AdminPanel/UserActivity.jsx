import React from 'react'
import { useGetUserActivity } from '../../hooks/useGetUserActivity'
import { FaShoppingCart, FaEye, FaBox, FaArrowRight } from "react-icons/fa";

export const UserActivity = () => {
  const {getActivities} = useGetUserActivity();
  console.log("activities",getActivities)
  
  const activitiesAmount = (index) => {
         let totalCarted = 0;
getActivities[index].cartedItems.forEach(item=>(
       totalCarted+=item.cartedQuantity

      
      )
)
return totalCarted

}





  return (
<>
<div className="min-h-screen bg-gray-100 p-8">
  <div className="mb-6">
  <h1 className="text-3xl font-bold text-gray-800">User Activities</h1>
  <p className="text-gray-500">Overview of user interactions</p>
</div>
<div className="bg-white rounded-xl shadow overflow-x-auto">
  <table className="min-w-full border-collapse">
    
    <thead className="bg-blue-600 text-white">
      <tr>
        <th className="px-6 py-4 text-left">User</th>
        <th className="px-6 py-4 text-center">
          <FaShoppingCart className="inline mr-2" /> Carted
        </th>
        <th className="px-6 py-4 text-center">
          <FaEye className="inline mr-2" /> Viewed
        </th>
        <th className="px-6 py-4 text-center">
          <FaBox className="inline mr-2" /> Ordered
        </th>
        <th className="px-6 py-4 text-center">Details</th>
      </tr>
    </thead>

    <tbody>
      {/* User Row */}

      {
        getActivities.map((activities,index)=>(
                 <tr  key={activities.id} className="border-b hover:bg-gray-100 cursor-pointer">
        <td className="px-6 py-4 font-semibold text-gray-800">
          {activities?.name}
          <p className="text-sm text-gray-500">
            {activities?.email}
          </p>
        </td>

        <td className="px-6 py-4 text-center font-semibold text-green-600">
          {activitiesAmount(index)}
        </td>

        <td className="px-6 py-4 text-center font-semibold text-blue-600">
          18
        </td>

        <td className="px-6 py-4 text-center font-semibold text-purple-600">
          2
        </td>

        <td className="px-6 py-4 text-center">
          <FaArrowRight className="mx-auto text-gray-500" />
        </td>
      </tr>



        ))
      }

      
    </tbody>

  </table>
</div>

</div>
</>
  )
}
