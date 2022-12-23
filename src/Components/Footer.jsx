import React from 'react';
import Select from 'react-select';
import { useTheme } from '../Context/ThemeContext';
import { themeOptions } from '../Utils/theme';
import GitHubIcon from '@mui/icons-material/GitHub';
const Footer = () => {

    const {setTheme, defaultTheme} = useTheme();

    const handleThemeChange = (e)=>{
        console.log(e.value);
        setTheme(e.value);
        localStorage.setItem('theme', JSON.stringify(e.value));
    }
 
    
    const customStyles = {
      option: (styles, state) => ({
        ...styles,
        cursor: 'pointer',
      }),
      control: (styles) => ({
        ...styles,
        cursor: 'pointer',
      }),

    }
  return (
    <div className='footer'>

    
      <div className="links">
      <a href='https://github.com/'>
          <GitHubIcon style={{marginRight:'4px'}}/>
      </a>
          
      </div>
      <div className="themes">
        <Select
              options={themeOptions}
              onChange={handleThemeChange}
              menuPlacement='top'
              defaultValue={{value:defaultTheme, label: defaultTheme.label}}
              styles={customStyles}
          />
      </div>
        

    </div>
  )
}

export default Footer