import React, { useEffect, useState } from 'react'
import BrowserTitleBar from '../components/titlebar/BrowserTitleBar'
import PumpStartStop from '../components/tasks/PumpStartStop'
import PumpTimeSchedule from '../components/tasks/PumpTimeSchedule'
import AutoHarvestSwitch from '../components/tasks/AutoHarvestSwitch'
import { getTasks } from '../api/getTasks'

function Tasks() {

  const[task,setTask]=useState(null);

  const getTask=async()=>{
    try {
      const res=await getTasks();
      setTask(res.data.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getTask()
  },[])

  return (
    <div>
      <BrowserTitleBar title={"Task Area"}/>
      <PumpStartStop task={task} setTask={setTask}/>
      <AutoHarvestSwitch task={task} setTask={setTask}/>
      <PumpTimeSchedule task={task} setTask={setTask}/>
    </div>
  )
}

export default Tasks