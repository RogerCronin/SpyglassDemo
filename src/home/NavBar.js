import React from "react"

import "./NavBar.css"

import vanguardLogo from "./vanguard.png"

export default class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            out: false
        }
    }

    toggle = () => {
        this.setState({ out: !this.state.out })
    }

    render() {
        return (
            <div className="navBar">
                <SidePanel />
                <div className="navBarIcon">
                    <img src={vanguardLogo} alt="vanguard logo" />
                </div>
            </div>
        )
    }
}

/*
<div className="search-container">
    <input type="text" placeholder="Search..." name="search" />
    <button type="submit">
        <i className="material-icons w3-large">search</i>
    </button>
</div>
*/

class SidePanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            out: false
        }
    }

    toggle = () => {
        this.setState({ out: !this.state.out })
    }

    render() {
        return (
            <div>
                <button className="menuButton" onClick={this.toggle}>☰</button>
                <div className={`sidePanel${this.state.out ? " sidePanelOut" : ""}`}>
                    <div>
                        <span className="closeButton" onClick={this.toggle}>x</span>
                        <span>HOME</span>
                        <span>GOALS</span>
                        <span>SUPPORT</span>
                        <span>GUIDE</span>
                        <span>ABOUT US</span>
                    </div>
                </div>
                {this.state.out ? <div className="navBarBackground" /> : null}
            </div>
        )
    }
}