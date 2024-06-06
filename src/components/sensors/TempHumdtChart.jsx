import React, { useRef, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function TempHumdtChart({ temp, humdt,times }) {
    const chartRef = useRef(null);

    useEffect(() => {
        const updateChart = () => {
            if (chartRef.current) {
                chartRef.current.render();
            }
        };

        window.addEventListener('resize', updateChart);
        return () => window.removeEventListener('resize', updateChart);
    }, []);

    const options = {
        theme: 'light2',
        animationEnabled: true,
        // title: {
        //     text: 'Temperature and Humidity Over Time',
        //     fontSize: 20,
            
        // },
        axisX: {
            title: 'Time',
        },
        axisY: [
            {

                titleFontColor: '#4F81BC',
                lineColor: '#4F81BC',
                labelFontColor: '#4F81BC',
                tickColor: '#4F81BC',
                suffix: '°C',
            },
            {
                titleFontColor: '#028A0F',
                lineColor: '#028A0F',
                labelFontColor: '#028A0F',
                tickColor: '#028A0F',
                suffix: '%',
                opposite: true,
            },
        ],
        toolTip: {
            shared: true,
        },
        data: [
            {
                type: 'spline',
                name: 'Temperature',
                axisXIndex: 1,
                showInLegend: true,
                yValueFormatString: '#,##0.00°C',
                dataPoints: temp.map((value, index) => ({ x: index, y: value })),
            },
            {
                type: 'spline',
                name: 'Humidity',
                axisYIndex: 1,
                showInLegend: true,
                yValueFormatString: '#,##0.00',
                dataPoints: humdt.map((value, index) => ({ x: index, y: value })),
            },
        ],
    };

    return (
        <div className='p-4'>
            <p className='font-xl font-bold mb-6'>Temperature and Humidity Over Time</p>
            <CanvasJSChart
                options={options}
                onRef={(ref) => (chartRef.current = ref)}
            />
        </div>
    );
}

export default TempHumdtChart;
