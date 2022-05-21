import React from "react"

import "./GuideStyle.css"
import "./Collapsible.css"
import "../icons.css"

import NavBar from "../home/NavBar"

class Guide extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <div className="content guideContent">
                    <h1 className="title">How-To Guide</h1>
                    <div>
                        <hr />
                        <Collapsible label="Add a goal">
                            To add a goal, press the button that adds the goal, duh. This is example text put here to pad out the content.
                            There is no set-in-stone text yet because the UI hasn't been finished. Now this text length is alright, I
                            think. Time to end the paragraph that I've been typing for the last minute or so.
                        </Collapsible>
                        <Collapsible label="Delete a goal">
                            Still just padding text.
                        </Collapsible>
                        <Collapsible label="Edit an existing goal">
                            Still just padding text.
                        </Collapsible>
                        <Collapsible label="Save your updates">
                            Still just padding text.
                        </Collapsible>
                        <Collapsible label="Update your account info">
                            Still just padding text.
                        </Collapsible>
                        <Collapsible label="Update your bank info">
                            Still just padding text.
                        </Collapsible>
                        <Collapsible label="Contact support">
                            Still just padding text.
                        </Collapsible>
                    </div>
                </div>
            </div>
        )
    }
}

class Collapsible extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: true
        }
    }

    render() {
        return (
            <div className="collapsible">
                <label>
                    <h1>{this.props.label}<Arrow /></h1>
                    <input type="checkbox"/>
                    <p className="collapsibleContent">{this.props.children}</p>
                    <p className="collapsibleMargin" />
                    <hr />
                </label>
            </div>
        )
    }
}

class Arrow extends React.Component {
    render() {
        return <i className="material-icons arrowIcon">play_circle_outline</i>
    }
}

export default Guide