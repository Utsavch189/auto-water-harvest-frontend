import React, { useContext, useState } from 'react';
import loginlottie from '../lottie/login.json';
import Lottie from 'react-lottie'
import { login } from '../api/login';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { ApiContext } from '../context/apiContext';


function Login() {

    const [logincred,setLogincred]=useState({
        username:"",
        password:""
    })

    const[loading,setLoading]=useState(false);

    const navigate=useNavigate();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loginlottie,

        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const logins=async()=>{
        try{
            if(logincred.username && logincred.password){
                setLoading(true);
                const res=await login(logincred);
                if(res.status===200){
                    sessionStorage.setItem('rasp_id',res.data.id);
                    toast.success("Login Successful!")
                    setTimeout(() => {
                        navigate("/");
                        window.location.reload();
                    }, 1500);
                }
            }
        }
        catch(err){
            console.log(err)
            toast.error(err.response.data.message)
        }
        finally{
            setLoading(false);
        }
        
    }

    return (
        <>
        <Toaster
          position="top-center"
          reverseOrder={true}
        />
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Lottie options={defaultOptions}
                    height={160}
                    width={120}
                    style={{ position: "relative" }}
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={(e)=>e.preventDefault()}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Raspberry Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={logincred.username}
                                onChange={(e)=>setLogincred(p=>({...p,username:e.target.value}))}
                                required
                                className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={logincred.password}
                                onChange={(e)=>setLogincred(p=>({...p,password:e.target.value}))}
                                required
                                className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        {!loading ? 
                            <button
                            type="submit"
                            onClick={logins}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                        :
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Loading...
                        </button>
                        }
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login