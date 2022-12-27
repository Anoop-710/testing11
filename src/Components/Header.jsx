import React from 'react'
import AccountIcon from './AccountIcon.jsx'
import CompareButton from './CompareButton.jsx'
const Header = () => {
  return (
    <div className="header">
        <div className="logo">
            <span>
              <img src="https://cutewallpaper.org/cdn-cgi/mirage/dd19f2d06ebc24f541f142b37b4289ffa7de722a7607e39984c5c6dd4ce8defd/1280/24/animated-computer-gifs/computer-c4f8c-keyboard-53e02-gifs-09723-get-f46c8-the-640fd-best-9ec59-gif-f45b7-on-0fcad-giphy.gif" alt="logo"  width={100}/>
            </span>
            <div>
              <CompareButton/>
            </div>
        </div>
        <div className="user-logo">
            <AccountIcon/>
        </div>
    </div>
  )
}

export default Header