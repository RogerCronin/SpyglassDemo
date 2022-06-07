import React from "react"
import { useParams } from "react-router-dom"

import "./GoalViewStyle.css"
import "../icons.css"

import NavBar from "../home/NavBar"
import ErrorBanner from "../login/ErrorBanner"

class GoalView extends React.Component {
    savingsTips = [
        "Savings tip: Budget enough savings not only for your down payment but also for closing costs, property taxes, and ongoing repairs to make sure you're ready for home ownership.",
        "Savings tip: Saving up for a larger down payment can allow you to have a lower monthly payment.",
        "Savings tip: Apply for as many grants and scholarships as possible to limit costs.",
        "Savings tip: Consistently make small contributions and watch your emergency fund grow. We suggest a minimum goal of $500.",
        "Savings tip: The sooner you book a flight, the cheaper they typically are. Try and plan your vacations far in advance to maximize your savings time.",
        "Savings tip: If your workplace offers a retirement plan, contribute up to the maximum amount allowed by law for the greatest retirement benefit.",
        ""
    ]

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
        let bar = document.querySelector(".progressBar").childNodes[0]
        if(goal.current_amount >= goal.target_amount) {
            document.body.classList.add("greenBG")
            bar.style.backgroundColor = "var(--LightGreen)"
        }
        bar.style.width = `${Math.min(goal.current_amount / goal.target_amount * 100, 100)}%`
    }

    componentWillUnmount() {
        document.body.classList.remove("greenBG")
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
        if(!res.ok) return window.location.replace("/goals")
        return json
    }

    savingsTip(type) {
        return this.savingsTips[type]
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
                        {this.state.description === "" ? null : <p className="description">"{this.state.description}"</p>}
                    </div>
                    <div className="middleInfo">
                        <div className="progressBar">
                            <div></div>
                        </div>
                        <p>{dispMoney(this.state.currentAmount)} / {dispMoney(this.state.targetAmount)} dollars</p>
                        <p className="description">{this.savingsTip(this.state.type)}</p>
                        <p className="description">{dispTimestamp(this.state.targetDate)} deadline</p>
                        {this.state.targetDate < Date.now() / 1000 ? <b>Deadline has passed</b> : <p className="description">Save ${dispMoney((this.state.targetAmount - this.state.currentAmount) / Math.floor((this.state.targetDate - Date.now() / 1000) / 604800))} per week</p>}
                    </div>
                    <MoneyTransfer goalID={this.props.params.id} />
                </div>
            </div>
        )
    }
}

class EditBar extends React.Component {
    back = () => window.location.assign("/goals")
    edit = () => window.location.assign(`/goals/${this.props.goalID}/edit`)

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
        window.location.reload()
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
    return parseFloat((Math.round(v * 100) / 100 + .001).toString().slice(0, -1)).toFixed(2)
}

function dispTimestamp(v) {
    let d = new Date(v * 1000)
    return d.toLocaleDateString({ year: "numeric", month: "short", day: "numeric" })
}

// use advanced trickery so I can still develop in react v18 with classes, I guess
// eslint-disable-next-line
export default props => <GoalView {...props} params={useParams()} />