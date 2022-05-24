import React from "react"
import { useParams } from "react-router-dom"

import "./GoalsStyle.css"
import "../icons.css"

import NavBar from "../home/NavBar"

class GoalView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            targetAmount: 0,
            currentAmount: 0,
            targetDate: 0,
            type: null,
            icon: null,
            userID: null
        }
    }

    async componentDidMount() {
        const { goal } = await this.getInformation()
        this.setState({
            title: goal.title,
            description: goal.description,
            targetAmount: goal.target_amount,
            currentAmount: goal.current_amount,
            targetDate: goal.target_date,
            type: goal.type,
            icon: goal.icon,
            userID: goal.user_id
        })
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

    render() {
        return (
            <div>
                <NavBar />
                <div className="content goalsContent">
                    <EditBar goalID={this.props.params.id} />
                    <h1 className="title">You've saved</h1>
                    <h1 className="title dollarAmount">${dispMoney(this.state.currentAmount)}</h1>
                    <h1 className="title">towards {this.state.title}</h1>
                    <p className="goalDescription">{this.state.description}</p>
                    <GoalBar current={this.state.currentAmount} target={this.state.targetAmount} />
                    <GoalTransfer goalID={this.props.params.id} />
                </div>
            </div>
        )
    }
}

class EditBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false
        }
    }

    goBack = () => {
        window.location.replace("/goals")
    }

    edit = () => {
        window.location.replace(`/goals/${this.props.goalID}/edit`)
    }

    render() {
        return (
            <div className="editBar">
                <i className="material-icons" onClick={this.goBack}>arrow_back</i>
                <i className="material-icons" onClick={this.edit}>edit</i>
            </div>
        )
    }
}

class GoalBar extends React.Component {
    render() {
        return (
            <div className="goalBar">
                <progress className="goalBar" value={this.props.current} max={this.props.target} />
                <p>{dispMoney(this.props.current)}/{dispMoney(this.props.target)} dollars</p>
                <p>{Math.floor(this.props.current / this.props.target * 100)}% there!</p>
            </div>
        )
    }
}

class GoalTransfer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            balance: 0,
            value: 0
        }
    }

    async componentDidMount() {
        const res = await fetch("/api/getBalance", {
            method: "POST",
            body: JSON.stringify({
                token: 1 // TODO change this with production data
            }),
            headers: { "Content-Type": "application/json" }
        })
        let json = await res.json()
        if(!res.ok) {
            alert("error!")
            return
        }
        this.setState({ balance: json.balance })
    }

    handleChange = e => {
        this.setState({ value: e.target.value })
    }

    transfer = async () => {
        const res = await fetch("/api/addToGoal", {
            method: "POST",
            body: JSON.stringify({
                token: 1, // TODO change this with production data
                id: this.props.goalID,
                value: this.state.value
            }),
            headers: { "Content-Type": "application/json" }
        })
        let json = await res.json()
        if(!res.ok) {
            alert("error!")
            return
        }
        console.log(json)
    }

    render() {
        return (
            <div className="goalTransfer">
                <p>${dispMoney(this.state.balance)} in account</p>
                <div>
                    <input type="number" onChange={this.handleChange}></input>
                    <button onClick={this.transfer}>Transfer to goal</button>
                </div>
            </div>
        )
    }
}

function dispMoney(v) {
    return Math.round(v * 100) / 100
}

// use advanced trickery so I can still develop in react v18 with classes, I guess
// eslint-disable-next-line
export default props => <GoalView {...props} params={useParams()} />