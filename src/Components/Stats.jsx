import React from 'react'
import Graph from './Graph'

const Stats = ({wpm, accuracy, correctChars, incorrectChars, missedChars, extraChars}) => {
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
            <Graph/>
        </div>
    </div>
  )
}



export default Stats