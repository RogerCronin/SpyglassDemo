import React from "react"
import { useParams } from "react-router-dom"

import "./GoalEdit.css"
import "../login/Login.css"
import "../icons.css"

import "../newAccount/AccountInputSign"

import NavBar from "../home/NavBar"
import AccountInputSign from "../newAccount/AccountInputSign"
import ErrorBanner from "../login/ErrorBanner"

class GoalEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            targetAmount: 0,
            targetDate: "1970-01-01",
            type: 0,
            icon: 0
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault()
        const res = await fetch("/api/updateGoal", {
            method: "POST",
            body: JSON.stringify({
                token: 1, // TODO change
                id: this.props.params.id,
                title: this.state.title,
                description: this.state.description,
                targetAmount: this.state.targetAmount,
                targetDate: dateToTimestamp(this.state.targetDate),
                type: this.state.type,
                icon: this.state.icon
            }),
            headers: { "Content-Type": "application/json" }
        })
        const json = await res.json()
        if(!res.ok) {
            this.changeValue(json.error)
            this.displayError(true)
            return
        }
        window.location.assign(`/goals/${this.props.params.id}`)
    }

    handleDelete = async () => {
        const res = window.confirm("Delete this goal? This action cannot be reversed.")
        if(res) {
            const res = await fetch("/api/deleteGoal", {
                method: "POST",
                body: JSON.stringify({
                    token: 1, // TODO change
                    id: this.props.params.id
                }),
                headers: { "Content-Type": "application/json" }
            })
            if(!res.ok) {
                alert("Well THAT's not supposed to happen........")
                return
            }
            window.location.replace("/goals")
        }
    }

    async getInformation() {
        const res = await fetch("/api/getGoal", {
            method: "POST",
            body: JSON.stringify({
                token: 1, // TODO change this with production data
                id: this.props.params.id
            }),
            headers: { "Content-Type": "application/json" }
        })
        let json = await res.json()
        if(!res.ok) {
            alert("error!")
            return
        }
        return json
    }

    async componentDidMount() {
        const { goal } = await this.getInformation()
        this.setState({
            title: goal.title,
            description: goal.description || "",
            targetAmount: dispMoney(goal.target_amount),
            targetDate: timestampToDate(goal.target_date),
            type: goal.type,
            icon: goal.icon || 0
        })
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
                        <button className="submit" onClick={this.handleSubmit}>Update Goal</button><br /><br />
                        <button className="submit" onClick={this.handleDelete}>Delete Goal</button>
                    </div>
                </div>
            </div>
        )
    }
}

function dispMoney(v) {
    return Math.round(v * 100) / 100
}

function dateToTimestamp(v) {
    return Date.parse(v) / 1000
}

function timestampToDate(v) {
    let d = new Date(v * 1000)
    return `${d.getFullYear()}-${(d.getMonth() + 1001).toString().substring(2)}-${(d.getDate() + 1000).toString().substring(2)}`
}

// eslint-disable-next-line
export default props => <GoalEdit {...props} params={useParams()} />