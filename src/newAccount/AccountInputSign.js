import React from "react"

import AccountInput from "../login/AccountInput.js"

export default class AccountInputSign extends React.Component {
    render() {
        return (
            <div>
                <p className="sign1">{this.props.sign}</p>
                <AccountInput name={this.props.name} type={this.props.type} placeholder={this.props.placeholder} changeFunction={this.props.changeFunction} />
            </div>
        )
    }
}