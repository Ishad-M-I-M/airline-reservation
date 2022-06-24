import React from "react";
import SubmitButton from "./SubmitButton";
import InputField from "./InputField";
import UserStore from "../stores/UserStore";
import "../App.css";
import background from '../images/background.jpg'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  resetForm() {
    this.setState({
      email: "",
      password: "",
      buttonDisabled: false,
    });
  }

  setInputValue(property, val) {
    val = val.trim();
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
      let res = await fetch("/login", {
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
        window.location.href="/";
      } else if (result && result.success === false) {
        console.log("NOT SUCCESSFULLY RECEIVED THE RESULT");
        this.resetForm();
        alert(result.msg);
      }
    } catch (e) {
      console.log(e);
      this.resetForm();
    }
  }

  render() {
    document.body.style.backgroundImage = `url(${background})`;
    return (
        <>
          <SubmitButton
              text="&larr; Back"
              disabled={this.state.buttonDisabled}
              onClick={() => window.history.back()}
          />
          <div className="container text-center bg-white bg-opacity-25 p-3" style={{width: "50rem",height: "fit-content", marginTop: "16rem"}}>
            <h2>Log in</h2>
            <InputField
                type="text"
                placeholder="Email"
                value={this.state.email ? this.state.email : ""}
                onChange={(val) => this.setInputValue("email", val)}
            />
            <InputField
                type="password"
                placeholder="Password"
                value={this.state.password ? this.state.password : ""}
                onChange={(val) => this.setInputValue("password", val)}
            />
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
