import React from "react"

import "../style.css"

import AccountInput from "./AccountInput"

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async e => {
        console.log(this.state)
        e.preventDefault()
        const res = await fetch("/api/submitLogin", {
            method: "POST",
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            headers: { "Content-Type": "application/json" }
        })
        if(!res.ok) return alert("Uh oh spaghetti o's!!!!! try \"asdf\" and \"1234\"")
        //let json = await res.json()
        alert("successfully logged in!!!!!!!!!!!!!!!")
    }

    render() {
        return (
            <div id="loginWrapper" className="main">
                <p className="sign" align="center">Spy Glass</p>
                <form className="form1">
                    <AccountInput name="username" changeFunction={this.handleChange} placeholder="Username"/>
                    <AccountInput name="password" type="password" changeFunction={this.handleChange} placeholder="Password"/>
                    <button className="submit" onClick={this.handleSubmit}>Sign in</button>
                    <p className="forgot"><a href="/newAccount">Need an Account?</a></p>
                </form>
            </div>
        )
    }
}

export default LoginPage