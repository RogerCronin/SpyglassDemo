import React from "react"

export default class AccountInput extends React.Component {
    render() {
        return (
            <input
                name={this.props.name}
                type={this.props.type || "text"}
                placeholder={this.props.placeholder}
                onChange={this.props.changeFunction}
                className="accountInput"
            />
        )
    }
}