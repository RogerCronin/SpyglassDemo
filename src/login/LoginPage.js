import React from "react"

import "./Login.css"

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

    componentDidMount() {
        document.body.classList.add("creamBG")
    }

    componentWillUnmount() {
        document.body.classList.remove("creamBG")
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
        sessionStorage.setItem("sessionID", json.sessionID)
        window.location.assign("/home")
    }

    render() {
        return (
            <div className="loginMain">
                <h1 className="loginMainTitle">Spy Glass</h1>
                <form>
                    <AccountInput name="email" changeFunction={this.handleChange} placeholder="Email"/>
                    <AccountInput name="password" type="password" changeFunction={this.handleChange} placeholder="Password"/>
                    <br />
                    <ErrorBanner value="Incorrect email or password" displayErrorFunc={f => this.displayError = f} />
                    <button onClick={this.handleSubmit}>Sign in</button>
                    <p><a href="/newAccount">Need an Account?</a></p>
                </form>
            </div>
        )
    }
}

export default LoginPage