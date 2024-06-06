import React, { useContext } from 'react'
import logo from '../../images/logo.webp';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

function Upper() {
  const authContext=useContext(AuthContext);
  const navigate=useNavigate();

  return (
    <div className='w-full h-10 bg-[#e9e9eb] flex items-center p-4 justify-between'>
        <img src={logo} className='h-6 w-6' alt="" />
        <i className="fa-solid fa-right-from-bracket" onClick={()=>{
          sessionStorage.removeItem('rasp_id');
          authContext?.setLogin(false);
          navigate("/login");
        }}></i>
    </div>
  )
}

export default Upper