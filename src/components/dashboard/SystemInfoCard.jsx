import React, { useContext } from 'react'
import Card from '../card/Card';
import DiskUsagePieChart from './Diskusage';
import { AppContext } from '../../context/appContext';

function SystemInfoCard() {
    const appContext = useContext(AppContext);

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">System Information</h2>
            <div className='flex gap-2 mt-2 items-center'>
                    <div className="w-2 h-2  bg-blue-600 rounded-full animate-ping"></div>
                    <p className='font-medium text-sm'>System Uptime : {appContext?.system_data && (new Date(parseInt(appContext?.system_data[0]?.system_uptime*1000))).toLocaleString()+' ['+[((new Date()-(new Date(parseInt(appContext?.system_data[0]?.system_uptime) * 1000)))/ (1000 * 60 * 60)).toFixed(1)]+' hours ]'}</p>
                    
                </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
                <Card cls={'h-36 w-46'} title='System' value={appContext?.system_data && appContext?.system_data[0]?.core_info?.system} icon='fa-brands fa-ubuntu'/>
                <Card cls={'h-36 w-46'} title='NodeName' value={appContext?.system_data && appContext?.system_data[0]?.core_info?.node_name} icon='fa-solid fa-circle-nodes'/>
                <Card cls={'h-36 w-60'} title='Version' value={appContext?.system_data && appContext?.system_data[0]?.core_info?.version} icon='fa-solid fa-code-compare'/>
                               
            </div>
            <div className='mt-4'>
            <h2 className="text-xl font-semibold mb-4">Disk Usage</h2>
                <DiskUsagePieChart/> 
            </div>
            
        </div>
    );
}

export default SystemInfoCard