import React from 'react';
import { observer } from 'mobx-react';

import './App.css';
import Container from './components/container';
import Navbar from './components/navbar';
import UserStore from './stores/UserStore';
import LoginForm from './components/LoginForm';

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
          'Accept':'application/json',
          'Content-Type':'application/json',
        },
        credentials: "include",
      });

      let result = await res.json();

      console.log(`Checking is logged in`);
      console.log(result);
      if(result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.email = result.email;
      }else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
        UserStore.email ='';
      }
    }catch(err) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
      console.error(err);
    }
  }

  async doLogout() {
    
    try {

      let res = await fetch('/logout', {
        method: 'post',
        headers : {
          'Accept': 'application/json',
          'Content-Type' : 'application/json', 
        },
      });

      let result = await res.json();

      if(result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.email = '';
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(UserStore);
    if(UserStore.loading) {
      return (
        <div className='App bg-black'>
          <div className='container'>
            Loading, please wait...
          </div>
        </div>
      );
    }else if(UserStore.isLoggedIn) {
        return (
        <div className="App bg-black">
          <Navbar onClick={() =>{this.doLogout()}}/>
          <Container/>
        </div>
        );
    }
    return (
      <LoginForm />
    );

  }
}

export default observer(App);
