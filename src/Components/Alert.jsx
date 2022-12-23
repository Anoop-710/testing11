import React from 'react'
import { useAlert } from '../Context/AlertContext'
import { Alert, Slide, Snackbar } from '@mui/material';


const Alert2 = () => {
// Note that providing just alert instead of alert2 causes overlapping with material ui alert component
    const {alert, setAlert} = useAlert();

    const handleClose = (event, reason)=>{
        //reason - if the user clicks anywhere on the snackbar
        if(reason === 'clickaway'){
            return;
        }
        setAlert({
            open: false,
            type: '',
            message: ''
        });

    }
  return (
    <div>
        <Snackbar
            // alert is an object open is a field for that object 
            open={alert.open} 
            autoHideDuration={2000} 
            onClose={handleClose}       //handleClose function to set open field as false
            anchorOrigin={
                {
                    vertical: 'top',
                    horizontal: 'right'
                }
            }
           >    
           <Slide in={alert.open}>    
                <Alert severity={alert.type} onClose={handleClose}>
                        {alert.message}
                </Alert>
           </Slide>
        </Snackbar>
    </div>
  )
}

export default Alert2