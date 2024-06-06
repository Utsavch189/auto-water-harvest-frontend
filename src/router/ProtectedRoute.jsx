import React, { useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import Login from '../pages/Login';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../context/apiContext';


function ProtectedRoute({children}) {

    const[login,setLogin]=useState(false);
    const [loading,setLoading]=useState(false);

    const navigate=useNavigate();

    useEffect(()=>{
        if(sessionStorage.getItem('rasp_id')){
            setLogin(true);
        }
        else{
            setLogin(false);
            navigate("/login");
        }
    },[login])

    const values={
        login,setLogin
    }

    const loadingContextValues={
        loading,setLoading
    }

    if(login){
        return (
            <ApiContext.Provider value={loadingContextValues}>
                <AuthContext.Provider value={values}>
                    {children}
                </AuthContext.Provider>
            </ApiContext.Provider>
        )
    }
  return (
    <ApiContext.Provider value={loadingContextValues}>
        <Login/>
    </ApiContext.Provider>
  )
}

export default ProtectedRoute