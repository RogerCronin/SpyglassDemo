import React from "react"
import { BrowserRouter, Routes, Route} from "react-router-dom"

import LoginPage from "./login/LoginPage"

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
            </Routes>
            </BrowserRouter>
        )
    }
}

export default App