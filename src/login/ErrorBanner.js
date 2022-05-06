import React from "react"

export default class ErrorBanner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            value: props.value
        }
        this.displayError = this.displayError.bind(this)
        this.changeValue = this.changeValue.bind(this)
    }

    componentDidMount() {
        this.props.displayErrorFunc(this.displayError)
        if(this.props.changeValueFunc) this.props.changeValueFunc(this.changeValue)
    }

    displayError(value) {
        this.setState({ visible: value })
    }

    changeValue(value) {
        this.setState({ value: value })
    }

    render() {
        if(this.state.visible) return (
            <p className="errorBanner">{this.state.value}</p>
        )
    }
}