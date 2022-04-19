import React from "react"

import "./LoginPage.css"

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    handleUsername = e => {
        this.setState({ username: e.target.value })
    }

    handlePassword = e => {
        this.setState({ password: e.target.value })
    }

    handleSubmit = async e => {
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
                <p className="sign" align="center">Sign in</p>
                <form className="form1">
                    <input className="un" type="text" onChange={this.handleUsername} align="center" placeholder="Username" />
                    <input className="pass" type="password" onChange={this.handlePassword} align="center" placeholder="Password" />
                    <button className="submit" align="center" onClick={this.handleSubmit}>Sign in</button>
                    <p className="forgot" align="center">Forgot password?</p>
                </form>
            </div>
        )
    }
}

export default LoginPage