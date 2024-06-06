import React, { useContext, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { AppContext } from '../../context/appContext';

const MemoryUsageChart = () => {

  const appContext=useContext(AppContext);
  const [memoryusage,setMemoryusage]=useState([]);


  useEffect(()=>{
    if(appContext?.system_data){
      setMemoryusage([])
      appContext?.system_data?.map((v,i)=>{
        let data={
          timestamp:v?.uploaded_at,
          used: v?.memory_usage['used']?.split(' ')[0],
          available: v?.memory_usage['free']?.split(' ')[0],
          percentage:v?.memory_usage['percentage']
        }
        setMemoryusage(p=>[...p,data]);
      })
    }
  },[appContext?.system_data])
  const series = [
    {
      name: 'Memory Usage',
      data: memoryusage.map(point => ({
        x: point.timestamp,
        y: parseFloat(point.percentage)
      }))
    }
  ];

  const options = {
    chart: {
      height: 350,
      type: 'area'
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      title: {
        text: 'Memory Usage (GB)'
      },
      max:100
    },
    title: {
      text: `Memory Usage Over Time (current : ${memoryusage && memoryusage[0]?.percentage}%)`,
      align: 'left'
    }
  };

  return (
    <Chart options={options} series={series} type="area" height={350} />
  );
};

export default MemoryUsageChart;
