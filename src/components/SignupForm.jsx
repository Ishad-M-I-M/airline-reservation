// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/clerk.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

// import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// import Password from './PasswordAlert';
import ListGroup from 'react-bootstrap/ListGroup';

function SignupForm() {
  const nav = useNavigate();
  const [value, setValue] = React.useState(false);
  const [values, setValues] = React.useState({
    password: "",
    re_password: "",
    showPassword: false,
    fname: "",
    lname: "",
    email: "",
    samepassword: false,
    date: ""

  });


  const validatePassword = (p) => {
    // var p = document.getElementById('newPassword').value,
    let errors = [];
    if (p.length < 8) {
      errors.push("Your password must be at least 8 characters");
    }
    if (p.search(/[a-z]/i) < 0) {
      errors.push("Your password must contain at least one letter.");
    }
    if (p.search(/[0-9]/) < 0) {
      errors.push("Your password must contain at least one digit.");
    }
    if (errors.length > 0) {
      // alert("error in pwd");
      setValues({
        ...values,
        samepassword: true
      });
      return (
        false
      );
    }
    return true;
  }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };


  const handleSubmit = (e) => {
    // alert("hi");
    // // console.log(values);
    axios.post('auth/adduser', values).then(() => {
      alert('Account Created');
      nav("/");
    }).catch((err) => {
      console.log(err);
    });


  }
  const samePwd = () => {
    setValues({
      ...values,
      samepassword: !values.samepassword,
    });
  };

  const addUser = () => {
    

    if (values.fname==="" || values.email === "" || values.password=== "" || values.re_password === "" || values.date === "" ){
      // console.log("Empty");
      setValue({
        value: true
      });
      // console.log(value.value);
    }else{
      // console.log(values.fname);
      setValue({
        value: false
      });
      // console.log(value.value);
    
    // setTimeout(function(){ setValues({ ...values, ['alert']: false }); }, 6000);
    if (values.password !== values.re_password && !values.samepassword) {
      samePwd();
    }
    if (values.password == values.re_password && !values.samepassword && validatePassword(values.password)) {

      // alert("hi");
      handleSubmit();
      // const bcrypt = require('bcrypt');
      // let pswrd = bcrypt.hashSync(values.password, 10);
    } else if (values.password == values.re_password && values.samepassword && validatePassword(values.password)) {
      console.log(validatePassword(values.password));
      samePwd();
      handleSubmit();
    }
    // values.email !== '' && alert(`${values.email}___${values.fname}`);

  }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (

    <div className='optionsss'>
      <h2>Sign UP</h2>
      <FormControl >
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <div>
            <TextField sx={{ m: 1, width: '30ch' }} id="outlined-basic" label="First Name" variant="outlined"

              value={values.fname}
              onChange={handleChange('fname')}
              required />

            <TextField sx={{ m: 1, width: '30ch' }} id="outlined-basic" label="Last Name" variant="outlined"

              value={values.lname}
              onChange={handleChange('lname')} />

            <br />
            <FormControl sx={{ m: 1, width: '30ch' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth*"
                  value={values.date}
                  onChange={(newValue) => {

                    setValues({ ...values, ['date']: newValue });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Email*</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={'text'}
                value={values.email}
                onChange={handleChange('email')}
                label="Email*"
                startAdornment={<InputAdornment position="start"> <MailOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /></InputAdornment>}
              />

            </FormControl>
            <br />
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password*"
              />
            </FormControl>


            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Re-Enter Password*</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.re_password}
                onChange={handleChange('re_password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Re-Enter Password*"
              />
            </FormControl>

          </div>

        </Box>
        {value.value? <Alert severity="warning"><strong>Fill All Required (*) Details!</strong> </Alert> :""}
        {values.samepassword ? <div> <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert  severity="info">
            <AlertTitle>Warning</AlertTitle>
            Warning in password — <strong>
            <br />
            Both password must be Same!
            <br />
            Your password must be at least 8 characters!
            <br />
            Your password must contain at least one letter!
            <br />
            Your password must contain at least one digit!
            <br />
            </strong>
          </Alert>
        </Stack></div> : ""}

       
        <Button variant="contained" sx={{ m: 1, width: '15ch' }} onClick={addUser} >Submit</Button>
      </FormControl>

    </div>

  );
}

export default SignupForm;

// export default SignupForm;