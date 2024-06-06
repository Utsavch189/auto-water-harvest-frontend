import React from 'react'
import CpuChart from '../components/dashboard/CpuChart'
import MemoryUsageChart from '../components/dashboard/MemoryUsageChart'
import SystemInfoCard from '../components/dashboard/SystemInfoCard'
import BrowserTitleBar from '../components/titlebar/BrowserTitleBar'


function Dashboard() {
  return (
    <div>
      <BrowserTitleBar title={"Dashboard"}/>
      <SystemInfoCard/>
      <CpuChart/>
      <MemoryUsageChart/>
    </div>
  )
}

export default Dashboard