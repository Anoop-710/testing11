import React from 'react'
import Footer from "../Components/Footer";
import TypingBox from "../Components/TypingBox";
import Header from "../Components/Header";


var randomWords =  require('random-words');

const HomePage = () => {
    
    const words = randomWords(100);

    // useEffect(()=>{
  //   console.log("theme in app", theme);
  // },[theme]);
  return (
    <div>
        
      <div className="canvas">
      
        <Header/>
        <h1>Typing Test</h1>
        <TypingBox words={words}/>
        <Footer/>
      </div>
    
    </div>
  )
}

export default HomePage