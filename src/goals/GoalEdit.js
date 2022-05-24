import React from "react"
import { useParams } from "react-router-dom"

import "./GoalsStyle.css"
import "../login/Login.css"
import "../icons.css"

import "../newAccount/AccountInputSign"

import NavBar from "../home/NavBar"
import AccountInputSign from "../newAccount/AccountInputSign"

class GoalEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            targetAmount: 0,
            targetDate: "1970-1-1",
            type: 0,
            icon: 0
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async e => {
        alert(this.state.targetDate + "; " + dateToTimestamp(this.state.targetDate))
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
        if(!res.ok) {
            alert("oh no!!!!!!!")
            return
        }
        window.location.replace(`/goals/${this.props.params.id}`)
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
        document.body.classList.add("creamBG")
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

    componentWillUnmount() {
        document.body.classList.remove("creamBG")
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="content goalsView">
                    <div className="goalEdit">
                        <h1 className="title">Edit Goal</h1>
                        <AccountInputSign sign="Title" name="title" value={this.state.title} changeFunction={this.handleChange} />
                        <AccountInputSign sign="Description" name="description" value={this.state.description} changeFunction={this.handleChange} />
                        <AccountInputSign sign="Target Amount" name="targetAmount" type="number" value={this.state.targetAmount} changeFunction={this.handleChange} />
                        <AccountInputSign sign="Target Date" name="targetDate" type="date" value={this.state.targetDate} changeFunction={this.handleChange} />
                        <AccountInputSign sign="Type" name="type" value={this.state.type} changeFunction={this.handleChange} />
                        <AccountInputSign sign="Icon" name="icon" value={this.state.icon} changeFunction={this.handleChange} />

                        <button className="submit" onClick={this.handleSubmit}>Update Goal</button>
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