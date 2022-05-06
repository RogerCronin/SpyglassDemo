import React from "react"

import "../style.css"

import AccountInputSign from "./AccountInputSign"
import ErrorBanner from "../login/ErrorBanner"

export default class NewAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            accountNumber: "",
            routingNumber: "",
            ssn: ""
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault()
        const res = await fetch("/api/makeNewAccount", {
            method: "POST",
            body: JSON.stringify({
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
                accountNumber: this.state.accountNumber,
                routingNumber: this.state.routingNumber,
                ssn: this.state.ssn
            }),
            headers: { "Content-Type": "application/json" }
        })
        let json = await res.json()
        if(!res.ok) {
            this.changeValue(json.error)
            this.displayError(true)
            return
        }
        this.changeValue("Account successfully created! Redirecting...") // TODO make this green
        this.displayError(true)
        await new Promise(r => setTimeout(r, 3000))
        window.location.replace("/")
    }

    render() {
        return (
            <div id="newAccountWrapper" className="main">
                <form className="form1">
                    <p className="sign">Account Information</p>

                    <AccountInputSign sign="Email" name="email" placeholder="john.doe@example.com" changeFunction={this.handleChange} />
                    <AccountInputSign sign="First Name" name="firstName" placeholder="John" changeFunction={this.handleChange} />
                    <AccountInputSign sign="Last Name" name="lastName" placeholder="Doe" changeFunction={this.handleChange} />
                    <AccountInputSign sign="Password" type="password" name="password" placeholder="Password" changeFunction={this.handleChange} />

                    <p className="sign" >Bank Information</p>

                    <AccountInputSign sign="Account Number" name="accountNumber" placeholder="Account Number" changeFunction={this.handleChange} />
                    <AccountInputSign sign="Routing Number" name="routingNumber" placeholder="Routing Number" changeFunction={this.handleChange} />
                    <AccountInputSign sign="Social Security Number (SSN)" name="ssn" placeholder="SSN" changeFunction={this.handleChange} />

                    <ErrorBanner value="X" changeValueFunc={f => this.changeValue = f} displayErrorFunc={f => this.displayError = f} />
                    <button className="submit" onClick={this.handleSubmit}>Create Account</button>
                </form>
            </div>
        )
    }
}