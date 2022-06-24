import React from 'react';
import {observer} from 'mobx-react';

import './App.css';
import ClerkContainer from './components/ClerkContainer';
import Container from './components/Container';
import Navbar from './components/Navbar';
import UserStore from './stores/UserStore';
import Home from './components/Home';
import {LandingPage} from "./components/LandingPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

class App extends React.Component {

    constructor(props) {
        super(props);
        UserStore.isLoggedIn = true;
    }

    async componentDidMount() {

        try {
            let res = await fetch('/isLoggedIn', {
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

            let res = await fetch('/logout', {
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
                <div className='App bg-black'>
                    <div className='container'>
                        Loading, please wait...
                    </div>
                </div>
            );
        } else if (UserStore.isLoggedIn) {
            if (UserStore.role === 'moderator') {
                return (
                    <div className="App bg-black">
                        <Navbar logout={this.doLogout}/>
                        <Container/>
                    </div>
                );
            } else if (UserStore.role === 'clerk') {

                return (
                    <div className="App bg-black">
                        <Navbar logout={this.doLogout}/>
                        <ClerkContainer/>
                    </div>
                );
            } else if (UserStore.role === 'user') {

                return (
                    <Home logout={this.doLogout}/>
                );
            }
        } else if (!UserStore.isLoggedIn) {
            console.log(window.location.pathname);
            if(window.location.pathname === '/sign-in'){
                return (
                    <LoginForm/>
                );
            }
            else if(window.location.pathname === '/sign-up'){
                return (
                    <SignupForm/>
                );
            }
            return (
                <LandingPage/>
            );
        }

    }
}

export default observer(App);
