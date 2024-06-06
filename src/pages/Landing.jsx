import React from 'react'
import Lottie from 'react-lottie'
import landing from '../lottie/landing.json';

function Landing() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: landing,

        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className='flex flex-col gap-4 justify-center items-center w-full h-[100vh]'>
            <h3 className='font-bold text-blue-400'>Welcome To RaspiHarvest</h3>
            <Lottie options={defaultOptions}
                height={200}
                width={300}
                style={{ position: "relative" }}
            />
        </div>
    )
}

export default Landing