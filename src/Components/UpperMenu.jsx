import React from 'react'
import { useTestMode } from '../Context/TestModeContext'
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

const UpperMenu = ({countDown, currWordIndex}) => {

  // const [checked, setChecked] = React.useState(false);

  

  const {setTestSeconds,setTestMode, testMode, setTestWords, testWords} = useTestMode();

  const updateTime = (e)=>{
      setTestSeconds(e.target.id);
  }

  const updateWord = (e) =>{
    // console.log(typeof e.target.id);
      setTestWords(Number(e.target.id));
  }

  const updateMode = (e)=>{
    setTestMode(e.target.id);
  }

  const updateModeSwitch = () => {
    setTestMode(testMode === 'time' ? 'word' : 'time');
    
  }
  

  return (
    <div className="upper-menu">
      {(testMode==='time')?
        (<div className="counter">
        {countDown}
      </div>)
      :
      (
        <div className="counter">
        {currWordIndex}/{testWords}
      </div>
      )
    }
    <div className="modes">
        <span className="mode" id='time' > Time </span>
        
        <Switch
          onChange={updateModeSwitch}
        />
        <span className="mode" id='word'> Word </span>
        
      </div>

        
      {(testMode==='time') ? (<div className="time-modes">
        <div className="time" id={15} onClick={updateTime}>15s</div>
        <div className="time" id={30} onClick={updateTime}>30s</div>
        <div className="time" id={60} onClick={updateTime}>60s</div>
      </div>)
      :
      (<div className="word-modes">
        <div className="no-of-word" id={10} onClick={updateWord}>10w</div>
        <div className="no-of-word" id={20} onClick={updateWord}>20w</div>
        <div className="no-of-word" id={30} onClick={updateWord}>30w</div>
      </div>)}
    </div>
  )
}

export default UpperMenu