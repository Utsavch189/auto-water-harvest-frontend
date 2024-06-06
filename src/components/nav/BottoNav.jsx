import React from 'react'
import { Link } from 'react-router-dom'

function BottomNavbar() {

  return (

    <>
      <div className="fixed bottom-0 bg-[#e9e9eb] left-0 z-50 w-full h-16  border-t-2 border-gray-200 ">
        <div className="flex items-center justify-between h-full max-w-lg grid-cols-4 mx-auto font-medium">
          <Link
            to={"/"}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group"
          >
            <i className="fa-solid fa-house text-blue-900  group-hover:text-blue-600 dark:group-hover:text-blue-500" style={{ "fontSize": "20px" }}></i>
            <span className="text-sm text-blue-900  group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Home
            </span>
          </Link>
          <Link
            to={"/sensor"}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group"
          >
            <i className="fa-solid fa-gauge text-blue-900  group-hover:text-blue-600 dark:group-hover:text-blue-500" style={{ "fontSize": "20px" }}></i>
            <span className="text-sm text-blue-900  group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Sensor
            </span>
          </Link>
          <Link
            to={"/tasks"}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group"
          >
            <i className="fa-solid fa-list-check text-blue-900  group-hover:text-blue-600 dark:group-hover:text-blue-500" style={{ "fontSize": "20px" }}></i>
            <span className="text-sm text-blue-900  group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Task
            </span>
          </Link>
        </div>
      </div>

    </>


  )
}

export default BottomNavbar