import React, { useContext } from 'react'
import Card from '../card/Card'
import humidity_svg from '../../images/humidity.svg';
import soil_moist_svg from '../../images/soil_moist.svg';
import temp_svg from '../../images/temp.svg';
import { AppContext } from '../../context/appContext';

function Header() {

    const appContext=useContext(AppContext);

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Sensor Information</h2>
            <div className='flex gap-2 mt-2 items-center'>
                <div className="w-2 h-2  bg-blue-600 rounded-full animate-ping"></div>
                <p className='font-medium text-sm'>Real Time Sensor Data</p>

            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
                <Card cls={'h-36 w-46'} title='Temperature' value={appContext?.sensor_data && appContext?.sensor_data[0]?.temp_data} svg={temp_svg} />
                <Card cls={'h-36 w-46'} title='Humidity' value={appContext?.sensor_data && appContext?.sensor_data[0]?.humidity_data} svg={humidity_svg} />
                <Card cls={'h-36 w-60'} title='Soil Moisture' value={appContext?.sensor_data && appContext?.sensor_data[0]?.soil_moist_data} svg={soil_moist_svg} />

            </div>

        </div>
    )
}

export default Header