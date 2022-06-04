import React from "react"

import "./GoalsStyle.css"
import "../icons.css"

import NavBar from "../home/NavBar"

class Goals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            goals: []
        }
    }

    async componentDidMount() {
        const goals = await this.getGoals()
        this.setState({ goals: goals })
    }

    async getGoals() {
        const res = await fetch("/api/getGoals", {
            method: "POST",
            body: JSON.stringify({
                token: 1 //sessionStorage.getItem("sessionID") // TODO change this out and remove test data in SessionManager
            }),
            headers: { "Content-Type": "application/json" }
        })
        let json = await res.json()
        if(!res.ok) {
            alert("error!")
            return
        }
        return json.goals.map(g => <Goal key={g.goal_id}
            title={g.title}
            id={g.goal_id}
            type={g.type}
            progress={g.current_amount / g.target_amount * 100} />)
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="content goalsContent">
                    <h1 className="title">Goals</h1>
                    {/* Search box here, maybe? */}
                    <div>
                        {this.state.goals}
                        <Goal key="newGoal"
                            title="New Goal"
                            id="newGoal"
                            type="7"
                            progress="-1" />
                    </div>
                </div>
            </div>
        )
    }
}

class Goal extends React.Component {
    iconList = [
        "house",
        "directions_car",
        "school",
        "emergency_home",
        "beach_access",
        "elderly",
        "flare",
        "add"
    ]

    handleClick = async () => {
        window.location.assign(`/goals/${this.props.id}`)
    }

    icon(type) {
        return this.iconList[type]
    }

    render() {
        return (
            <div className="goal" onClick={this.handleClick}>
                <div className="material-icons">{this.icon(this.props.type)}</div>
                <p>{this.props.title}</p>
                <div className="progressBar" style={{ display: this.props.progress === "-1" ? "none" : "" }}>
                    <div style={{ width: `${this.props.progress}%` }}></div>
                </div>
            </div>
        )
    }
}

export default Goals