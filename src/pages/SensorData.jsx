import React from 'react'
import Header from '../components/sensors/Header'
import Charts from '../components/sensors/Charts'
import BrowserTitleBar from '../components/titlebar/BrowserTitleBar'

function SensorData() {
  return (
    <div>
      <BrowserTitleBar title={"Sensor Area"}/>
      <Header/>
      <Charts/>
    </div>
  )
}

export default SensorData