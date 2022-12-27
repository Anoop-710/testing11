import { wordsList } from 'random-words';
import React, { createRef, useEffect, useRef, useState, useMemo } from 'react'
import Stats from './Stats';
import { useTestMode } from '../Context/TestModeContext';
import UpperMenu from './UpperMenu';
import { Dialog, DialogTitle } from '@material-ui/core';

var randomWords = require('random-words');


const TypingBox = () => {

    const [wordsArray,setWordsArray] = useState(()=>{
        return randomWords(300);
    })


    // useMemo similar to useEffect , it is used when we need to optimize the react code since it avoids useless rendering
    //it memoizes the value on which it is used and by memoizing it caches that value, by using the saved state , it avoids the re-rendering

     const words = useMemo(() => {
        return wordsArray;

     },[wordsArray])


    // in react you get a hook , useRef()
    // react also provides a function, createRef() 

    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [countDown,setCountDown] = useState(5);
    const [testStart,setTestStart] = useState(false);
    const [testEnd,setTestEnd] = useState(false);
    const [testTime, setTestTime] = useState(15);
    const [correctChars, setCorrectChars] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);
    const [incorrectChars, setIncorrectChar] = useState(0);
    const [missedChars, setMissedChars] = useState(0);
    const [extraChars, setExtraChars] = useState(0);
    const [graphData, setGraphData] = useState([]);
    const {testSeconds} = useTestMode();
    const [intervalId, setIntervalId] = useState(null);
    const [open, setOpen] = useState(false);

    const inputRef = useRef(null);
    const wordSpanRef = useMemo(()=>{
        return Array(words.length).fill(0).map(i=>createRef(null));
    },[words]);


    const resetTest = ()=>{
        setCurrCharIndex(0);
        setCurrWordIndex(0);
        setTestStart(false);
        setTestEnd(false);
        clearInterval(intervalId);
        setCountDown(testSeconds);
        setTestTime(testSeconds);
        setWordsArray(randomWords(300));
        setGraphData([]);
        setCorrectChars(0);
        setCorrectWords(0);
        setExtraChars(0);
        setIncorrectChar(0);
        setMissedChars(0);
        resetWordSpanRefClassname();
        focusInput();
    }

    const redoTest = ()=>{
        setCurrCharIndex(0);
        setCurrWordIndex(0);
        setTestStart(false);
        setTestEnd(false);
        clearInterval(intervalId);
        setCountDown(testSeconds);
        setTestTime(testSeconds);
        setGraphData([]);
        setCorrectChars(0);
        setCorrectWords(0);
        setExtraChars(0);
        setIncorrectChar(0);
        setMissedChars(0);
        resetWordSpanRefClassname();
        focusInput();
    }

    //Setting timer
    
   const startTimer = ()=>{

        

        const intervalId = setInterval(timer, 1000);
        setIntervalId(intervalId);


        function timer(){
            // console.log("timer function is working");
            setCountDown((prevCountDown)=>{
                

                    //Graph data
                    setCorrectChars((correctChars)=>{
                        setGraphData((data)=>{
                            return [...data, [testTime-prevCountDown,Math.round((correctChars/5)/((testTime-prevCountDown+1)/60))]];
                        });

                        
                        return correctChars;
                    })

                   
                    

                    if(prevCountDown===1){
                        setTestEnd(true);
                        clearInterval(intervalId);
                        return 0;
                    }
                return prevCountDown-1;
            });
        }

    }

     


    const handleKeyDown = (e)=>{

        if(e.keyCode===9){
            if(testStart){
                clearInterval(intervalId);
            }
            e.preventDefault();
            setOpen(true);
            return;
        }

        let allChildSpans = wordSpanRef[currWordIndex].current.childNodes;


        if(e.keyCode!==8 && e.key.length>1){
            e.preventDefault();
            return;
        }


        // Start testTime
        if(!testStart){
            startTimer();
            setTestStart(true);
        }

        //logic for space press -> increase my currWordIndex by 1
        if(e.keyCode===32){


            // Counting the number of correct words to calculate the accuracy
            const correctChars = wordSpanRef[currWordIndex].current.querySelectorAll('.correct');

            if(correctChars.length === allChildSpans.length){
                setCorrectWords(correctWords+1);
            }


            //removing cursor
            if(allChildSpans.length<=currCharIndex){
                //cursor present as a right one
                allChildSpans[currCharIndex-1].classList.remove('right-current');
            }
            else{
                //cursor in between

                setMissedChars(missedChars+(allChildSpans.length-currCharIndex));       //Updating missedChars


                for(let i=currCharIndex;i<allChildSpans.length;i++){
                    allChildSpans[i].className+=' skipped';
                }
                allChildSpans[currCharIndex].className = allChildSpans[currCharIndex].className.replace('current','');

            }


            //scrollinig line condition
            if(wordSpanRef[currWordIndex+1].current.offsetLeft < wordSpanRef[currWordIndex].current.offsetLeft){
                wordSpanRef[currWordIndex].current.scrollIntoView();
            }



            wordSpanRef[currWordIndex+1].current.childNodes[0].className = 'char current';
            setCurrWordIndex(currWordIndex+1);
            setCurrCharIndex(0);


            return;
        }


        //logic for backspace
        if(e.keyCode === 8){
            
            if(currCharIndex!==0){


                if(currCharIndex===allChildSpans.length){
                    if(allChildSpans[currCharIndex-1].className.includes('extra')){
                        allChildSpans[currCharIndex-1].remove();
                        allChildSpans[currCharIndex-2].className+=' right-current'
                    }
                    else{
                        allChildSpans[currCharIndex-1].className = 'char current';
                    }
                    
                    setCurrCharIndex(currCharIndex-1);
                    return;
                }


                allChildSpans[currCharIndex].className = 'char';
                allChildSpans[currCharIndex-1].className = 'char current';
                setCurrCharIndex(currCharIndex-1);
            }
            


            return;
        }

        if(currCharIndex === allChildSpans.length){
            //add new extra characters

            setExtraChars(extraChars+1);    //if extra characters are added by the user

            let newSpan = document.createElement('span'); // -> <span></span>
            newSpan.innerText = e.key;
            newSpan.className = 'char incorrect extra right-current';
            allChildSpans[currCharIndex-1].classList.remove('right-current');
            wordSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex+1);

            return;
        }

        if(e.key===allChildSpans[currCharIndex].innerText){
            allChildSpans[currCharIndex].className = 'char correct';
            setCorrectChars(correctChars+1);
        }
        else{
            allChildSpans[currCharIndex].className = 'char incorrect';
            setIncorrectChar(incorrectChars+1);
        }
        if(currCharIndex+1 === allChildSpans.length){
            allChildSpans[currCharIndex].className+=' right-current';
        }
        else{
            allChildSpans[currCharIndex+1].className = 'char current';
        }
        
        setCurrCharIndex(currCharIndex+1);

    }


    //Handling dialog box

    const handleDialogBoxEvents = (e)=>{

        if(e.keyCode===32){
            //logic for redo game
            e.preventDefault();
            redoTest();
            setOpen(false);
            return;
        }
        if(e.keyCode===9 || e.keyCode===13){
            //logic for reset game
            e.preventDefault();
            resetTest();
            setOpen(false);
            return;
        }

        e.preventDefault();
        setOpen(false);
        startTimer();
    }

    const resetWordSpanRefClassname = ()=>{
        wordSpanRef.map(i=>{
            Array.from(i.current.childNodes).map(j=>{
                j.className = 'char'
            });
        });
        wordSpanRef[0].current.childNodes[0].className = 'char current';
    }


    const calculateWPM = ()=>{
        return Math.round((correctChars/5)/(testTime/60))
    }

    const calculateAccuracy = ()=>{
        return Math.round((correctWords/currWordIndex)*100);
    }

    const focusInput = ()=>{
        inputRef.current.focus();
    }

    useEffect(()=>{
        focusInput();
        wordSpanRef[0].current.childNodes[0].className = 'char current';
    },[]);


    useEffect(()=>{
        resetTest();
    },[testSeconds]);



  return (
    <div>
            <UpperMenu countDown={countDown}/>
              {(testEnd) ? (<Stats 
                                wpm={calculateWPM()} 
                                accuracy={calculateAccuracy()} 
                                correctChars={correctChars} 
                                incorrectChars={incorrectChars}
                                missedChars={missedChars} 
                                extraChars={extraChars}
                                graphData={graphData}
                                />
                                ) :
                  (
                    <div className="type-box" onClick={focusInput}>
                      <div className="words">
                          {words.map((word, index) => (
                              <span className='word' ref={wordSpanRef[index]} key={index}>
                                  {word.split('').map((char, ind) => (
                                      <span className='char' key={ind}>{char}</span>
                                  ))}
                              </span>
                          ))}
                      </div>
                      </div>
                  )
              }


        
        <input
            type='text'
            className='hidden-input'
            ref={inputRef}
            onKeyDown={(e)=>handleKeyDown(e)}
        />


        <Dialog 
            open={open}
            style={{
                backdropFilter: 'blur(2px)'
            }}
            PaperProps={{
                style: {
                    backgroundColor:'transparent',
                    boxShadow: 'none'
                }
            }}
            onKeyDown={handleDialogBoxEvents}
            >
            <DialogTitle>
                <div className="instruction">press SPACE to redo</div>
                <div className="instruction">press TAB/ENTER to restart</div>
                <div className="instruction">press any other key to exit</div>
            </DialogTitle>
        </Dialog>
    </div>
  )
}

export default TypingBox