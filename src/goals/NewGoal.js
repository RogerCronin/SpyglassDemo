import React from "react"

import "./GoalEdit.css"
import "../login/Login.css"

import "../newAccount/AccountInputSign"

import NavBar from "../home/NavBar"
import AccountInputSign from "../newAccount/AccountInputSign"
import ErrorBanner from "../login/ErrorBanner"

class NewGoal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            targetAmount: 0,
            targetDate: timestampToDate(new Date() / 1000),
            type: 0,
            icon: 0
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault()
        const res = await fetch("/api/newGoal", {
            method: "POST",
            body: JSON.stringify({
                token: 1, // TODO change
                title: this.state.title,
                description: this.state.description,
                targetAmount: this.state.targetAmount,
                targetDate: dateToTimestamp(this.state.targetDate),
                type: this.state.type
            }),
            headers: { "Content-Type": "application/json" }
        })
        const json = await res.json()
        if(!res.ok) {
            this.changeValue(json.error)
            this.displayError(true)
            return
        }
        window.location.assign(`/goals`)
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="content goalEditContent">
                    <div className="goalEdit">
                        <AccountInputSign sign="Title" name="title" value={this.state.title} changeFunction={this.handleChange} />
                        <AccountInputSign sign="Description" name="description" value={this.state.description} changeFunction={this.handleChange} />
                        <AccountInputSign sign="Target Amount" name="targetAmount" type="number" value={this.state.targetAmount} changeFunction={this.handleChange} />
                        <AccountInputSign sign="Target Date" name="targetDate" type="date" value={this.state.targetDate} changeFunction={this.handleChange} />
                        <p className="inputSign">Goal Type</p>
                        <select name="type" value={this.state.type} onChange={this.handleChange}>
                            <option value="0">House</option>
                            <option value="1">Vehicle</option>
                            <option value="2">Education</option>
                            <option value="3">Emergency Fund</option>
                            <option value="4">Vacation</option>
                            <option value="5">Retirement</option>
                            <option value="6">Custom</option>
                        </select>
                        <ErrorBanner value="Error" changeValueFunc={f => this.changeValue = f} displayErrorFunc={f => this.displayError = f} />
                        <button className="submit" onClick={this.handleSubmit}>Create Goal</button>
                    </div>
                </div>
            </div>
        )
    }
}

function timestampToDate(v) {
    let d = new Date(v * 1000)
    return `${d.getFullYear()}-${(d.getMonth() + 1001).toString().substring(2)}-${(d.getDate() + 1000).toString().substring(2)}`
}

function dateToTimestamp(v) {
    return Date.parse(v) / 1000
}

export default NewGoal