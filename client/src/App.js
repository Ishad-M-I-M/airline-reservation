import React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import ClerkContainer from './components/ClerkContainer';
import Container from './components/Container';
import Navbar from './components/Navbar';
import UserStore from './stores/UserStore';
import Home from './components/Home';
import { LandingPage } from "./components/LandingPage";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import SearchFlight from './components/SearchFlight';
import ChooseFlights from './components/ChooseFlights';
import PaymentPage from './components/PaymentPage';
import Tickets from './components/Tickets';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { toast } from "react-toastify";
class App extends React.Component {

    constructor(props) {
        super(props);
        UserStore.isLoggedIn = true;
    }

    async componentDidMount() {

        try {
            let res = await fetch('/auth/isLoggedIn', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            });

            let result = await res.json();

            if (result && result.success) {
                UserStore.loading = false;
                UserStore.isLoggedIn = true;
                UserStore.email = result.email;
                UserStore.role = result.role;


            } else {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
                UserStore.email = '';
                UserStore.role = '';

            }
        } catch (err) {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
            console.log(err);
        }
    }

    async doLogout() {


        try {

            let res = await fetch('/auth/logout', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            let result = await res.json();

            if (result && result.success) {
                UserStore.isLoggedIn = false;
                UserStore.email = '';
                UserStore.role = '';

            }

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if (UserStore.loading) {
            return (
                <div>

                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={true}
                        onClick={() => { }}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>

            );
        } else if (UserStore.isLoggedIn) {
            if (UserStore.role === 'moderator') {
                return (
                    <div className="App bg-black">
                        <Navbar logout={this.doLogout} />
                        <Container />
                        <ToastContainer
                            position="top-right"
                            autoClose={4000}
                            hideProgressBar={false}
                            theme="colored"
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            draggable={false}
                        />
                    </div>
                );
            } else if (UserStore.role === 'clerk') {

                return (
                    <div className="App bg-black">
                        <Navbar items = {[ {item : "View Tickets", link : "/tickets"}]} logout={this.doLogout} />
                        <ClerkContainer />
                        <ToastContainer
                            position="top-right"
                            autoClose={4000}
                            hideProgressBar={false}
                            theme="colored"
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            draggable={false}
                        />
                    </div>
                );
            } else if (UserStore.role === 'user') {

                return (
                    <div>
                        <ToastContainer
                            position="top-right"
                            autoClose={4000}
                            hideProgressBar={false}
                            theme="colored"
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            draggable={false}
                        />
                        <Home logout={this.doLogout} />
                    </div>

                );
            }
        } else if (!UserStore.isLoggedIn) {
            return (
                <div>
                    <ToastContainer
                        position="top-right"
                        autoClose={4000}
                        hideProgressBar={false}
                        theme="colored"
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        draggable={false}
                    />

                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/usr-booking" element={<div>
                                <div className="home-page">
                                    <Navbar />
                                    <div className="background-img">
                                        <SearchFlight />
                                    </div>
                                    {/*<Footer />*/}
                                </div>
                            </div>} />
                            <Route path="/sign-in" element={<LoginForm />} />
                            <Route path="/sign-up" element={<SignupForm />} />
                            <Route path="/searchResult" element={<ChooseFlights />}></Route>
                            <Route path="/paymentPage" element={<PaymentPage />}></Route>
                            <Route path="/tickets" element={<Tickets />}></Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            );
        }


    }
}

export default observer(App);
