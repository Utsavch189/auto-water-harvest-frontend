import React, { useContext, useEffect, useState } from 'react'
import TempHumdtChart from './TempHumdtChart';
import SoilMoistChart from './SoilMoistChart';
import { AppContext } from '../../context/appContext';

function Charts() {
    const appContext=useContext(AppContext);

    const [temp,setTemp]=useState([]);
    const [humdt,setHumdt]=useState([]);
    const [soilmoist,setSoilmoist]=useState([]);
    const [times,setTimes]=useState([]);

    // console.log(appContext?.sensor_data)

    useEffect(()=>{
        if(appContext?.sensor_data){
          setTemp([]);
          setHumdt([]);
          setSoilmoist([]);
          setTimes([]);
            // console.log(appContext?.sensor_data)
            appContext?.sensor_data?.map((v,i)=>{
                setTemp(p=>[...p,parseFloat(v?.temp_data)]);
                setHumdt(p=>[...p,parseFloat(v?.humidity_data)]);
                setSoilmoist(p=>[...p,parseInt(v?.soil_moist_data)]);
                setTimes(p=>[...p,v?.uploaded_at]);
            })
        }
    },[appContext?.sensor_data])

  return (
    <div>
        {appContext?.sensor_data&&
        <>
        {/* <TempChart temp={temp} times={times}/>
        <HumidityChart hmdt={humdt} times={times}/>    */}
        <TempHumdtChart temp={temp.reverse()} humdt={humdt.reverse()}/>
        <SoilMoistChart data={soilmoist.reverse()}/>
        </>
            
        }
    </div>
  )
}

export default Charts