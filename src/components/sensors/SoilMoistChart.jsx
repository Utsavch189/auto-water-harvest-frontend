import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function SoilMoistChart({ data }) {

    const dataPoints = data.map((value, index) => ({
        x: index, // Using index as x-value
        y: value // Integer value from the array
    }));

    const options = {
        animationEnabled: true,
        // title: {
        //     text: "Soil Moisture Chart"
        // },
        axisY: {
            // title: "Values",
            maximum: 30000,
            minimum:0
        },
        data: [{
            type: "splineArea",
            dataPoints: dataPoints
        }]
    };

    return (
        <div className='p-4'>
            <p className='font-xl font-bold mb-6'>Soil Moisture Over Time</p>
            <CanvasJSChart options={options} />
        </div>
    );
}
export default SoilMoistChart