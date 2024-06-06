import { PieChart } from '@mui/x-charts'
import React, { useContext } from 'react'
import { AppContext } from '../../context/appContext';


function Diskusage() {

    const appContext = useContext(AppContext);

    return (
        <>
            {appContext?.system_data &&
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 1, value: appContext?.system_data[0]?.memory_usage?.used?.split(' ')[0], label: 'Used' },
                                { id: 2, value: appContext?.system_data[0]?.memory_usage?.total?.split(' ')[0], label: 'Total' },
                            ],
                        },
                    ]}
                    width={300}
                    height={100}
                />
            }
        </>
    )
}

export default Diskusage