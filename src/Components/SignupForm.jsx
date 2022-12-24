import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { auth } from '../firebaseConfig';
import { useAlert } from '../Context/AlertContext';
import { useTheme } from 'styled-components';
import errorMapping from '../Utils/errorMapping';

const SignupForm = () => {


  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {setAlert} = useAlert();
    const {theme} = useTheme();

    const handleSubmit = ({handleClose})=>{
        if(!email || !password || !confirmPassword){
            setAlert({
                open: true,
                type: 'warning',
                message: 'fill all details'
            });
            return;
        }
        if(password!==confirmPassword){
            setAlert({
                open: true,
                type: 'warning',
                message: 'Password Mismatch'
            });
            return
        }
        
        auth.createUserWithEmailAndPassword(email, password).then((response)=>{
            setAlert({
                open: true,
                type: 'success',
                message: 'account created!'
            });
            handleClose();
        }).catch((err)=>{
            console.log("sign up failed",err);
            setAlert({
                open: true,
                type: 'error',
                message: errorMapping[err.code] || "Some error occurred please try again"
            });
        });
    }


  return (
    <Box
        p={3}
        style={{
            display:"flex",
            flexDirection:'column',
            gap:'20px'
        }}
    >
        

        <TextField
            type='text'
            variant='outlined'
            label='Enter Username'
            InputLabelProps={{
                style: {
                    color: theme.title
                }
            }}
            InputProps={{
                style: {
                    color: theme.title
                }
            }}
            onChange={(e)=>setEmail(e.target.value)}/>

        <TextField
            type='email'
            variant='outlined'
            label='Enter Email'

            InputLabelProps={{
                style:{
                    color: theme.color
                }
            }}

            InputProps={{
                style:{
                    color: theme.title
                }
            }}

            onChange={(e)=>setEmail(e.target.value)}/>
        <TextField
            type='password'
            variant='outlined'
            label='Enter Password'

            InputLabelProps={{
                style:{
                    color: theme.color
                }
            }}

            InputProps={{
                style:{
                    color: theme.title
                }
            }}

            onChange={(e)=>setPassword(e.target.value)}/>
        <TextField
            type='password'
            variant='outlined'
            label='Enter Confirm Password'

            InputLabelProps={{
                style:{
                    color: theme.color
                }
            }}

            InputProps={{
                style:{
                    color: theme.title
                }
            }}


            onChange={(e)=>setConfirmPassword(e.target.value)}/>
        <Button
            variant='contained'
            size='large'
            onClick={handleSubmit}>
                Signup
        </Button>

    </Box>
  )
}

export default SignupForm