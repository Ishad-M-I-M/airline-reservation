import React from 'react';
import { observer } from 'mobx-react';

import './App.css';
import ClerkContainer from './components/ClerkContainer';
import Container from './components/Container';
import Navbar from './components/Navbar';
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

      if(result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.email = result.email;
        UserStore.role = result.role;
      }else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
        UserStore.email ='';
        UserStore.role = '';
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
        UserStore.role = '';
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if(UserStore.loading) {
      return (
        <div className='App bg-black'>
          <div className='container'>
            Loading, please wait...
          </div>
        </div>
      );
    }else if(UserStore.isLoggedIn) {
      if(UserStore.role==='moderator') {
        return (
          <div className="App bg-black">
            <Navbar onClick={() =>{this.doLogout()}}/>
            <Container/>
          </div>
          );
      } else if (UserStore.role==='clerk') {
        return (
          <div className="App bg-black">
            <Navbar onClick={() =>{this.doLogout()}}/>
            <ClerkContainer/>
          </div>
          );
      }else if(UserStore.role==='user'){
        return(
          <div>INSERT USER COMPONENTS HERE</div>
        );
      }
    }
    return (
      <LoginForm />
    );

  }
}

export default observer(App);
