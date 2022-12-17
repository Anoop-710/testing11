import React from 'react'
import Graph from './Graph'

const Stats = ({wpm, accuracy, correctChars, incorrectChars, missedChars, extraChars, graphData}) => {
    var timeSet = new Set();        //Set allows us to store unique values
    const newGraph = graphData.filter((i)=>{
        
        // if the timer array has repeated elements at ith time , it will be filtered out by filter function
        // has(value) -> true or false , constant time
        // add(value) -> adds the value in set
        if(!timeSet.has(i[0])){
            timeSet.add(i[0]);
            return i;
        }
    })
  return (
    <div className='stats-box'>
        <div className="left-stats"> WPM
            <div className="title">
                <div className="subtitle">
                    {wpm}
                </div>
            </div>
            <div className="title">Accuracy
            <div className="subtitle">
                    {accuracy}
                </div>
            </div>
            <div className="title">Characters
            <div className="subtitle">
                    {correctChars}/{incorrectChars}/{missedChars}/{extraChars}
                </div>
            </div>
        </div>
        <div className="right-stats">
            <Graph graphData ={newGraph}/>
        </div>
    </div>
  )
}



export default Stats