import React, { createContext, useContext, useEffect, useState } from 'react'
import Landing from './pages/Landing';
import Upper from './components/nav/Upper';
import { Outlet } from 'react-router-dom';
import BottomNavbar from './components/nav/BottoNav';
import { AppContext } from './context/appContext';
import { evtSource } from './api/sse/event_stream';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from './context/authContext';


function App() {
  const [landing, setLanding] = useState(true);
  const [sensordata, setSensordata] = useState(null);
  const [systemdata, setSystemdata] = useState(null);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.login) {
      try {
        evtSource.onmessage = function (event) {
          let parsedData = JSON.parse(event.data).mydata;
          setSensordata(parsedData?.sensor_data)
          let system_data = parsedData?.system_data;
          // console.log(system_data)
          for (let i = 0; i < system_data?.length; i++) {
            system_data[i]['memory_usage'] = JSON.parse(system_data[i]['memory_usage']);
            system_data[i]['disk_usage'] = JSON.parse(system_data[i]['disk_usage']);
            system_data[i]['network_stats'] = JSON.parse(system_data[i]['network_stats']);
            system_data[i]['core_info'] = JSON.parse(system_data[i]['core_info'])
          }
          setSystemdata(system_data);
        };

        // Optional: Handle any errors that occur
        evtSource.onerror = function (err) {
          console.error("EventSource failed:", err);
        };
      } catch (error) {
        console.log(error)
      }
    }

  }, [evtSource, authContext.login])


  const values = {
    "system_data": systemdata,
    "sensor_data": sensordata
  }

  useEffect(() => {
    setTimeout(() => {
      setLanding(false);
    }, 2000);
  }, [])

  if (landing) {
    return <Landing />
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      <AppContext.Provider value={values}>
        <Upper />
        <Outlet />
        {/* <Test/> */}
        <div className='h-16'></div>
        <BottomNavbar />
      </AppContext.Provider>
    </>

  )
}

export default App