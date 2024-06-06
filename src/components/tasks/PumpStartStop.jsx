import React, { useEffect, useState } from 'react'
import { updateTask } from '../../api/updateTask';
import toast from 'react-hot-toast';

function PumpStartStop({task,setTask}) {
    const[pumpstatus,setPumpstatus]=useState(0);
    const [starloading,setStartLoading]=useState(false);
    const [stoploading,setStopLoading]=useState(false);

    useEffect(()=>{
        if(task?.pump_start_now){
            setPumpstatus(parseInt(task?.pump_start_now));
        }
    },[task])

    const updateTasks = async (status) => {
        setPumpstatus(status);
        const copy_task = { ...task };
        copy_task['auto_harvest'] = parseInt(copy_task['auto_harvest']);
        copy_task['pump_start_now']=parseInt(status);
        copy_task['system_cooling']=parseInt(copy_task['system_cooling']);
        try {
            const res = await updateTask(copy_task);
            console.log(res.data.data[0])
            setTask(res.data.data[0]);
            toast.success("Task Updated!")
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong!");
        }
        finally{
            setStartLoading(false);
            setStopLoading(false);
        }
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Pump Start and Stop Control</h2>
            <div className='flex gap-2 mt-1 items-center'>
                <div className={`w-2 h-2 rounded-full animate-ping ${pumpstatus ? 'bg-blue-600' : 'bg-red-600'}`}></div>
                <p className='font-medium text-sm'>Currently Pump Is {pumpstatus ? 'On' : 'Off'}</p>

            </div>
                <div class="bg-white flex gap-5 mt-3">

                    {
                        !starloading?
                        <button onClick={()=>{
                            setStartLoading(true)
                            updateTasks(1)
                            }} className="inline-flex items-center px-4 py-2 gap-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                            <i className='fa-solid fa-play'></i>
                            Start
                        </button>
                        :
                        <button className="inline-flex items-center px-4 py-2 gap-2 bg-indigo-400  text-white text-sm font-medium rounded-md">
                            Loading...
                        </button>
                    }

                    {
                        !stoploading?
                        <button onClick={()=>{
                            setStopLoading(true)
                            updateTasks(0)
                        }
                        } class="inline-flex items-center px-4 py-2 gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                            <i className='fa-solid fa-stop'></i>
                            Stop
                        </button>
                        :
                        <button class="inline-flex items-center px-4 py-2 gap-2 bg-red-400  text-white text-sm font-medium rounded-md">
                            Loading...
                        </button>
                    }

                </div>
        </div>
    )
}

export default PumpStartStop