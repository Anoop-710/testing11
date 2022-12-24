import React from 'react'
import {Line} from 'react-chartjs-2';
import { useTheme } from '../Context/ThemeContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Graph = ({graphData, type}) => {
    const {theme} = useTheme();
  return (
    <div>
        <Line 
            data={
                {
                    labels: graphData.map(i=>(type==='date')?(i[0].toDate().toLocaleString()):(i[0]+1)),
                    datasets: [
                        

                        {
                            data: [10,9,8,7,6],
                            label: 'random data2',
                            // borderColor: 'green',
                            data: graphData.map(i=>i[1]),
                            label: 'wpm',
                            borderColor: theme.title,
                        },
                        
                    ]
                }


            }
        />
        
        
    </div>
  )
}

export default Graph