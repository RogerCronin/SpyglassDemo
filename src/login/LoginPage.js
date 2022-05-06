import React from "react"

import "../style.css"

import AccountInput from "./AccountInput"
import ErrorBanner from "./ErrorBanner"

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault()
        const res = await fetch("/api/submitLogin", {
            method: "POST",
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }),
            headers: { "Content-Type": "application/json" }
        })
        if(!res.ok) return this.displayError(true)
        let json = await res.json()
        window.sessionID = json.sessionID
        window.location.replace("/home")
    }

    render() {
        return (
            <div id="loginWrapper" className="main">
                <p className="sign" align="center">Spy Glass</p>
                <form className="form1">
                    <AccountInput name="email" changeFunction={this.handleChange} placeholder="Email"/>
                    <AccountInput name="password" type="password" changeFunction={this.handleChange} placeholder="Password"/>
                    <br />
                    <ErrorBanner value="Incorrect email or password" displayErrorFunc={f => this.displayError = f} />
                    <button className="submit" onClick={this.handleSubmit}>Sign in</button>
                    <p className="forgot"><a href="/newAccount">Need an Account?</a></p>
                </form>
            </div>
        )
    }
}

export default LoginPage