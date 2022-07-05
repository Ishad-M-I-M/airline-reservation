import React from "react";
import SubmitButton from "./SubmitButton";
import UserStore from "../stores/UserStore";
import "../App.css";
import background from '../images/background.jpg'
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import OutlinedInput from '@mui/material/OutlinedInput';
import Alert from '@mui/material/Alert';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            showPassword: false,
            open: false
        };
    }

    resetForm() {
        this.setState({
            email: "",
            password: "",
            buttonDisabled: false,
            showPassword: false
        });
    }


    handleClose() {
        this.setState({
            open: false
        });
    };

    handleOpen() {

        this.setState({
            open: true
        });
        console.log(this.state.open);

    };

    handleClickShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    };

    handleMouseDownPassword(event) {
        event.preventDefault();
    };

    setInputValue(property, val) {
        // val = val.trim();
        // console.log();
        // console.log(val);
        if (val.length > 50) {
            return;
        }
        this.setState({
            [property]: val,
        });
    }

    async doLogin() {
        if (!this.state.email) {
            alert("Enter email");
            return;
        }
        if (!this.state.password) {
            alert("Enter password");
            return;
        }

        this.setState({
            buttonDisabled: true,
        });

        try {
            let res = await fetch("/auth/login", {
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                }),
                credentials: "include",
            });

            let result = await res.json();

            if (result && result.success) {
                console.log("SUCCESSFULLY RECEIVED THE RESULT");
                UserStore.isLoggedIn = true;
                UserStore.email = result.email;
                UserStore.role = result.role;
                window.location.href = "/";
            } else if (result && result.success === false) {
                console.log("NOT SUCCESSFULLY RECEIVED THE RESULT");
                this.handleOpen();
                this.resetForm();

            }
        } catch (e) {
            console.log(e);
            this.resetForm();
            // this.handleOpen();
        }
    }

    render() {
        document.body.style.backgroundImage = `url(${background})`;
        return (
            <>

                <div>
                    <Dialog
                        open={this.state.open}
                        onClose={() => this.handleClose()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"ALERT!!!"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">

                                <Alert severity="warning"><strong>Invalid Username Or Password!!</strong> </Alert>
                                {/* <Alert severity="error">
                  <AlertTitle><strong>Error</strong></AlertTitle>
                  Invalid Username Or Password!!
                </Alert> */}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.handleClose()}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <SubmitButton
                    text="&larr; Back"
                    disabled={this.state.buttonDisabled}
                    onClick={() => window.history.back()}
                />
                <div className="container text-center bg-white bg-opacity-75 p-3" style={{
                    width: "450px", height: "280px", marginTop: "16rem", padding: '25px'

                    , boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
                    borderRadius: '10px'
                }}>
                    <h2>Log in</h2>


                    <FormControl sx={{m: 1, width: '35ch'}} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Email*</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={'text'}
                            value={this.state.email ? this.state.email : ""}
                            onChange={(val) => this.setInputValue("email", val.target.value)}
                            label="Email*"
                            startAdornment={<InputAdornment position="start"> <MailOutlineIcon
                                sx={{color: 'action.active', mr: 1, my: 0.5}}/></InputAdornment>}
                        />

                    </FormControl>

                    <FormControl sx={{m: 1, width: '35ch'}} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password ? this.state.password : ""}
                            onChange={(val) => this.setInputValue("password", val.target.value)}
                            endAdornment={
                                <InputAdornment position="end">

                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => this.handleClickShowPassword()}
                                        // onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password*"
                        />
                    </FormControl>
                    <SubmitButton
                        text="Login"
                        disabled={this.state.buttonDisabled}
                        onClick={() => this.doLogin()}
                    />
                </div>
            </>

        );
    }
}

export default LoginForm;