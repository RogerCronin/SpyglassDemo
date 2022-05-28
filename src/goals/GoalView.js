import React from "react"
import { useParams } from "react-router-dom"

import "./GoalViewStyle.css"
import "../icons.css"

import NavBar from "../home/NavBar"
import ErrorBanner from "../login/ErrorBanner"

class GoalView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            targetAmount: 0,
            currentAmount: 0,
            targetDate: 0,
            type: 0,
            icon: 0,
            userID: 0
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
        document.querySelector(".progressBar").childNodes[0].style.width = `${goal.current_amount / goal.target_amount * 100}%`
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
                <div className="content goalViewContent">
                    <EditBar goalID={this.props.params.id} />
                    <div className="topInfo">
                        <p>You've saved</p>
                        <h1>${dispMoney(this.state.currentAmount)}</h1>
                        <p>towards {this.state.title}</p>
                        <p className="description">"{this.state.description}"</p>
                    </div>
                    <div className="middleInfo">
                        <div className="progressBar">
                            <div></div>
                        </div>
                        <p>{dispMoney(this.state.currentAmount)} / {dispMoney(this.state.targetAmount)} dollars</p>
                        <p className="description">{dispTimestamp(this.state.targetDate)} deadline</p>
                        <p className="description">Save ${dispMoney(5)} per week</p>
                    </div>
                    <MoneyTransfer />
                </div>
            </div>
        )
    }
}

class EditBar extends React.Component {
    back = () => window.location.replace("/goals")
    edit = () => window.location.replace(`/goals/${this.props.goalID}/edit`)

    render() {
        return (
            <div className="editBar">
                <span className="material-icons" onClick={this.back}>arrow_back</span>
                <span className="material-icons" onClick={this.edit}>edit</span>
            </div>
        )
    }
}

class MoneyTransfer extends React.Component {
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
            this.changeValue(json.error)
            this.displayError(true)
            return
        }
    }

    render() {
        return (
            <div className="moneyTransfer">
                <p>${dispMoney(this.state.balance)} in account</p>
                <div>
                    <input type="number" onChange={this.handleChange}></input>
                    <ErrorBanner value="Error transfering money" changeValueFunc={f => this.changeValue = f} displayErrorFunc={f => this.displayError = f} />
                    <button onClick={this.transfer}>Transfer to goal</button>
                </div>
            </div>
        )
    }
}

function dispMoney(v) {
    return (Math.round(v * 100) / 100 + .001).toString().slice(0, -1)
}

function dispTimestamp(v) {
    let d = new Date(v * 1000)
    return d.toLocaleDateString({ year: "numeric", month: "short", day: "numeric" })
}

// use advanced trickery so I can still develop in react v18 with classes, I guess
// eslint-disable-next-line
export default props => <GoalView {...props} params={useParams()} />