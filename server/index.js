const db = require("./database.js")

const handleDBRequest = require("./dashboard/handleDBRequest.js")
const submitLogin = require("./login/submitLogin.js")
const makeNewAccount = require("./newAccount/makeNewAccount.js")

const express = require("express")
const app = express()
const port = process.argv[2] == "true" ? 3000 : 5000

app.use(express.json())
db.init()

if(process.argv[2] == "true") {
    app.use(express.static("www"))
} else {
    app.get("/", (req, res) => {
        res.sendFile(`${__dirname}/dashboard/dashboard.html`)
    })
    app.post("/db", handleDBRequest)
}

app.post("/api/submitLogin", submitLogin)
app.post("/api/makeNewAccount", makeNewAccount)

app.listen(port, () => {
    console.log(`Backend open on port ${port}`)
})