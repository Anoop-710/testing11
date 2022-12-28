import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db,auth } from '../firebaseConfig';
import Graph from '../Components/Graph';
import { useNavigate } from 'react-router-dom';

const ComparePage = () => {
    const {username} = useParams();
    
    const navigate = useNavigate();
    
    const [loggedinUserData, setLoggedinUserData] = useState([]);
    const [loggedinUserGraphData, setLoggedinUserGraphData] = useState([]);

    const [compareUserData, setCompareUserData] = useState([]);
    const [compareUserGraphData, setCompareUserGraphData] = useState([]);
    const getUID = async()=>{
        const response = await db.collection('usernames').doc(username).get();
        return response.data().uid;
    }

    const getData = async()=>{
        const compareUserUID = await getUID();
        const {uid} = auth.currentUser;
        console.log(uid.username+ "llllll");
        const resultsRef = db.collection('Results');
        let tempData = [];
        let tempGraphData = []
        resultsRef.where('userID','==',uid).orderBy('timeStamp','desc').get().then((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                console.log("working");
                tempData.push({...doc.data()});
                tempGraphData.push([doc.data().timeStamp, doc.data().wpm]);
            });
            setLoggedinUserData(tempData);
            setLoggedinUserGraphData(tempGraphData.reverse());
            // setDataLoading(false);
        });

        let tempData1 = [];
        let tempGraphData1 = []
        resultsRef.where('userID','==',compareUserUID).orderBy('timeStamp','desc').get().then((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                console.log("working");
                tempData1.push({...doc.data()});
                tempGraphData1.push([doc.data().timeStamp, doc.data().wpm]);
            });
            setCompareUserData(tempData1);
            setCompareUserGraphData(tempGraphData1.reverse());
            // setDataLoading(false);
        });

    }

    useEffect(()=>{
        getData();
    },[]);
  return (
    <>
    <div className='compareHeader'>Compare data</div>
    <div className='compareData'>
        <div className="graph"><span id='currentUserGraph'>Your graph</span>
            <Graph graphData={loggedinUserGraphData} type='date'/>
        </div>
        <div className="graph"><span id='comparedUserGraph'>{username}'s   graph</span>
            <Graph graphData={compareUserGraphData} type='date'/>
        </div>

    </div>
    <div className='homeBtn'>
        <button onClick={()=>navigate('/')}>Home</button>
        <button onClick={()=>navigate('/user')}>User</button>
    </div>
    </>
    
  )
}

export default ComparePage