const db = require("../database.js")
const sessionManager = require("../sessionManager.js")
const bcrypt = require("bcrypt")

async function submitLogin(req, res) {
    const body = req.body
    try {
        const result = await db.all("select password, user_id from 'user' where email = ?", body.email)
        const { password, user_id } = result[0]
        let passwordRes = await bcrypt.compare(body.password, password)
        if(!passwordRes) throw new Error()
        res.status(200).send(JSON.stringify({
            success: true,
            sessionID: sessionManager.createSession(user_id)
        }))
    } catch {
        res.status(403).send(JSON.stringify({
            success: false,
            sessionID: null
        }))
    }
}

module.exports = submitLogin