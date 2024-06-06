import React from 'react'

function Card({cls,title,value,icon,svg}) {

    return (
        <div className={`relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl `.concat(`${cls}`)}>
        <div className="p-6">
          {
            icon ? <i className={icon} style={{fontSize:"30px"}}></i> : svg ? <img src={svg} alt="" height={30} width={30}/> : <></>
          }
          <h5 className="block mt-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {title}
          </h5>
          <p className="block mt-2 font-sans text-sm antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {value}
          </p>
        </div>
      </div>
      
    )
}

export default Card