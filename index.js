const express = require("express")
const app = express()
const port = 5000

app.use(express.static("www"))

app.listen(port, () => {
    console.log(`Backend open on port ${5000}`)
})