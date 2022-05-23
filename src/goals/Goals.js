import React from "react"

import "./GoalsStyle.css"

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
            icon={g.icon} />)
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
                    </div>
                </div>
            </div>
        )
    }
}

class Goal extends React.Component {
    handleClick = async e => {
        window.location.replace(`/goals/${this.props.id}`)
    }

    render() {
        return (
            <div className="goal" onClick={this.handleClick}>
                <div />
                <p>{this.props.title}</p>
            </div>
        )
    }
}

export default Goals