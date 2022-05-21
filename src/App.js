import React from "react"
import { BrowserRouter, Routes, Route} from "react-router-dom"

import LoginPage from "./login/LoginPage"
import NewAccount from "./newAccount/NewAccount"
import Home from "./home/Home"
import Guide from "./guide/Guide"

import "./Style.css"

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/newAccount" element={<NewAccount />} />
                <Route path="/home" element={<Home />} />
                <Route path="/guide" element={<Guide />} />
            </Routes>
            </BrowserRouter>
        )
    }
}

export default App