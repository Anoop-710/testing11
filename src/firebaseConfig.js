import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_ME,
//     appId: process.env.REACT_APP_ID
// }


const firebaseConfig = {
    apiKey: "AIzaSyAUtwe3gChKRsJBSy2VoNHdA_04ykeYeN0",
    authDomain: "typing-speed-test-f012c.firebaseapp.com",
    projectId: "typing-speed-test-f012c",
    storageBucket: "typing-speed-test-f012c.appspot.com",
    messagingSenderId: "912517569762",
    appId: "1:912517569762:web:67a19810ba35cb2c68d2bb"
  };

const firebaseApp  = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();
export {auth,db}