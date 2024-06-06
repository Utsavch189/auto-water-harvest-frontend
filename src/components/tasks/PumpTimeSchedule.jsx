import React, { useEffect, useState } from 'react'
import { updateTask } from '../../api/updateTask';
import toast from 'react-hot-toast';

function PumpTimeSchedule({task,setTask}) {

    const[times,setTimes]=useState({
        start_time:"00:00:00",
        end_time:"00:00:00"
    })

    const [doneloading,setDoneLoading]=useState(false);
    const [resetloading,setResetLoading]=useState(false);
    

    useEffect(()=>{
        if(task?.pump_schedule_start_time && task?.pump_schedule_end_time){
            setTimes(p=>({...p,start_time:task?.pump_schedule_start_time}));
            setTimes(p=>({...p,end_time:task?.pump_schedule_end_time}));
        }
    },[task])

    const reset=async()=>{
        const copy_task = { ...task };
            copy_task['auto_harvest'] = parseInt(copy_task['auto_harvest']);
            copy_task['pump_start_now']=parseInt(copy_task['pump_start_now']);
            copy_task['system_cooling']=parseInt(copy_task['system_cooling']);
            copy_task['pump_schedule_start_time']="00:00:00";
            copy_task['pump_schedule_end_time']="00:00:00";

            try {
                const res = await updateTask(copy_task);
                console.log(res.data.data[0])
                setTask(res.data.data[0]);
                toast.success("Schedule Reset!");
            } catch (error) {
                console.log(error);
                toast.error("Something Went Wrong!");
            }
            finally{
                setResetLoading(false);
            }
    }


    const updateTasks = async () => {
        if(times?.start_time && times?.end_time){
            const copy_task = { ...task };
            copy_task['auto_harvest'] = parseInt(copy_task['auto_harvest']);
            copy_task['pump_start_now']=parseInt(copy_task['pump_start_now']);
            copy_task['system_cooling']=parseInt(copy_task['system_cooling']);
            copy_task['pump_schedule_start_time']=times?.start_time.concat(':00');
            copy_task['pump_schedule_end_time']=times?.end_time.concat(':00');

            try {
                const res = await updateTask(copy_task);
                console.log(res.data.data[0])
                setTask(res.data.data[0]);
                toast.success("Task Updated!");
            } catch (error) {
                console.log(error);
                toast.error("Something Went Wrong!");
            }
            finally{
                setDoneLoading(false);
            }
        }
    }



    return (
        <div className='bg-white  rounded-lg p-6 flex flex-col items-center justify-center gap-4'>
            <h2 className="text-xl font-semibold mb-4">Pump Time Schedule Control</h2>

            <div className=' flex items-center gap-5'>

                <form class="max-w-[8rem] mx-auto" onSubmit={(e)=>e.preventDefault()}>
                    <h2 className="text-sm font-semibold mb-2">Select start time :</h2>
                    <div class="relative">
                        <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <input type="time" id="time" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="09:00" max="18:00" value={times.start_time} onChange={(e)=>setTimes(p=>({...p,start_time:e.target.value}))}  required />
                    </div>
                </form>


                <form class="max-w-[8rem] mx-auto" onSubmit={(e)=>e.preventDefault()}>
                    <h2 className="text-sm font-semibold mb-2">Select end time :</h2>
                    <div class="relative">
                        <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <input type="time" id="time" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="09:00" max="18:00" value={times.end_time} onChange={(e)=>setTimes(p=>({...p,end_time:e.target.value}))} required />
                    </div>
                </form>

            </div>
            <div className='flex gap-4'>
                {
                    !doneloading ?
                    <button onClick={()=>{
                        setDoneLoading(true);
                        updateTasks();
                    }} class="inline-flex items-center px-4 py-2 gap-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                        <i className='fa-solid fa-check'></i>
                        Done
                    </button>:
                    <button class="inline-flex items-center px-4 py-2 gap-2 bg-indigo-400  text-white text-sm font-medium rounded-md">
                        Loading...
                    </button>
                }

                {
                    !resetloading ?
                    <button onClick={()=>{
                        setResetLoading(true);
                        reset();
                    }} class="inline-flex items-center px-4 py-2 gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md">
                        <i className='fa-solid fa-rotate-left'></i>
                        Reset
                    </button>
                    :
                    <button class="inline-flex items-center px-4 py-2 gap-2 bg-red-400 text-white text-sm font-medium rounded-md">
                        Loading...
                    </button>
                }
            </div>

        </div>
    )
}

export default PumpTimeSchedule