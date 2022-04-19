const submitLogin = require("./login/submitLogin.js")

const express = require("express")
const app = express()
const port = process.argv[2] == "true" ? 3000 : 5000

app.use(express.json())

if(process.argv[2] == "true") {
    app.use(express.static("www"))
} else {
    app.get("/", (req, res) => {
        res.send("<h1>200</h1>")
        res.send(`<p>Backed open on port ${port}</p>`)
    })
}

app.post("/api/submitLogin", submitLogin)

app.listen(port, () => {
    console.log(`Backend open on port ${port}`)
})