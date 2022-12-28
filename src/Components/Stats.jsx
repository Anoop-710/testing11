import React ,{useEffect} from 'react'
import Graph from './Graph'
import {auth, db} from '../firebaseConfig';
import { useAlert } from '../Context/AlertContext';
import { useAuthState } from 'react-firebase-hooks/auth';

const Stats = ({wpm, accuracy, correctChars, incorrectChars, missedChars, extraChars, graphData, resetTest}) => {
    var timeSet = new Set();        //Set allows us to store unique values
    const {setAlert} = useAlert();
    const newGraph = graphData.filter((i)=>{
        
        // if the timer array has repeated elements at ith time , it will be filtered out by filter function
        // has(value) -> true or false , constant time
        // add(value) -> adds the value in set
        if(!timeSet.has(i[0])){
            timeSet.add(i[0]);
            return i;
        }
    })

    


    // Push the users result to the firebase
    
    const [user] = useAuthState(auth);
    const pushResultToDatabase = ()=>{
        const resultRef = db.collection('Results');
        const {uid} = auth.currentUser;

        if(!isNaN(accuracy)){

            resultRef.add({
                wpm: wpm,
                accuracy: accuracy,
                characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
                userID: uid,
                timeStamp: new Date()
            }).then((response)=>{
                setAlert({
                    open: true,
                    type: 'success',
                    message: 'Result save to database'
                });
            })
        }

        else{
            setAlert({
                open: true,
                type: 'error',
                message: 'invalid test',
            });
        }
        
    }

    useEffect(()=>{

        if(user){
            //saving because user is logged in;
            pushResultToDatabase();
        }
        else{
            //no user, no save
            setAlert({
                open: true,
                type: 'warning',
                message: 'login to save results'
            });
        }
        
    },[]);
    
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
            <div className='subtitle' onClick={resetTest}>Restart</div>
        </div>
        <div className="right-stats">
            <Graph graphData ={newGraph} />
        </div>
    </div>
  )
}



export default Stats