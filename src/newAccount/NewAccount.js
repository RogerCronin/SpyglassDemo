import React from "react"

import "../style.css"

import AccountInputSign from "./AccountInputSign"

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

                    <p className="submit1"><a href="/">Create Account</a></p>
                </form>
            </div>
        )
    }
}