import React, { useContext, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { AppContext } from '../../context/appContext';

const CpuChart = () => {

  const appContext=useContext(AppContext);

  const[temp,setTemp]=useState([]);
  const[usage,setUsage]=useState([]);
  const[times,setTimes]=useState([]);

  useEffect(()=>{
    if(appContext?.system_data){
      setTemp([]);
      setUsage([]);
      setTimes([]);
      appContext?.system_data?.map((v,i)=>{
        setTemp(p=>[...p,parseFloat(v?.cpu_temperature)]);
        setUsage(p=>[...p,parseFloat(v?.cpu_usage)*10]);
        setTimes(p=>[...p,v?.uploaded_at]);
      })
    }
  },[appContext?.system_data])

  const options = {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: `CPU Temperature Over Time (current : ${temp && temp[0]?.toFixed(2)}°C)`,
      align: 'left'
    },
    xaxis: {
      type: 'datetime',
      categories: times
    },
    yaxis: [
      {
        title: {
          text: 'CPU Temperature (°C)',
        },
        labels: {
          formatter: function (value) {
            return value.toFixed(2); // Format to two decimal places
          },
          show: true
        },
        opposite: true,
        max:100,
        min:0
      }
    ],
    legend: {
      horizontalAlign: 'left'
    }
  };

  const series = [
    {
      name: 'CPU Temperature',
      type: 'line',
      data: temp
    }
  ];


  const options_usage = {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: `CPU Usage Over Time (current : ${usage && usage[0]}%)`,
      align: 'left'
    },
    xaxis: {
      type: 'datetime',
      categories: times
    },
    yaxis: [
      {
        title: {
          text: 'CPU Usage (%)',
        },
        labels: {
          formatter: function (value) {
            return (value).toFixed(2) + '%'; // Format as percentage with two decimal places
          },
          show: true
        },
        max:100,
        min:0
      }
    ],
    legend: {
      horizontalAlign: 'left'
    }
  };

  const series_usage = [
    {
      name: 'CPU Usage',
      type: 'line',
      data: usage
    },
  ];

  return (
    <div id="chart">
      <Chart options={options} series={series} type="line" height={350} />
      <Chart options={options_usage} series={series_usage} type="line" height={350} />
    </div>
  );
};

export default CpuChart;
