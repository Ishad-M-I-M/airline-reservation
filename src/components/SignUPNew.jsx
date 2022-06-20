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
// import Box from '@mui/material/Box';
// import Input from '@mui/material/Input';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import AccountCircle from '@mui/icons-material/AccountCircle';

// import { ArrowRight } from 'react-bootstrap-icons';
// import VisibilityIcon from '@mui/icons-material/Visibility';
function SignUpNew() {
  const [values, setValues] = React.useState({
    password: '',
    re_password: '',
    showPassword: false,
    fname: "",
    lname: "",
    email: ""

  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
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
              onChange={handleChange('fname')} />

            <TextField sx={{ m: 1, width: '30ch' }} id="outlined-basic" label="Last Name" variant="outlined"

              value={values.lname}
              onChange={handleChange('lname')} />
            <br />

            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={'text'}
                value={values.email}
                onChange={handleChange('email')}
                label="Password"
                startAdornment={<InputAdornment position="start"> <MailOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /></InputAdornment>}
              />

            </FormControl>
            <br />
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                label="Password"
              />
            </FormControl>


            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Re-Enter Password</InputLabel>
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
                label="Re-Enter Password"
              />
            </FormControl>

          </div>

        </Box>


        <Button variant="contained" sx={{ m: 1, width: '15ch' }} >Submit</Button>
      </FormControl>

    </div>

  );
}

export default SignUpNew;