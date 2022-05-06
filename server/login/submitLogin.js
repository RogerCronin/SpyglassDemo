const db = require("../database.js")
const bcrypt = require("bcrypt")

async function submitLogin(req, res) {
    const body = req.body
    try {
        let hash = await db.all("select password from 'user' where email = ?", body.email)
        let passwordRes = await bcrypt.compare(body.password, hash[0].password)
        if(!passwordRes) throw new Error()
        res.status(200).send(JSON.stringify({
            success: true,
            sessionID: 1
        }))
    } catch {
        res.status(403).send(JSON.stringify({
            success: false,
            sessionID: null
        }))
    }
}

module.exports = submitLogin