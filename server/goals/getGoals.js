const db = require("../database.js")
const sessionManager = require("../sessionManager.js")

async function getGoals(req, res) {
    const body = req.body
    try {
        let userID = sessionManager.getAccountID(body.token)
        let goals = await db.all("select * from 'goal' where user_id = ?", userID)
        res.status(200).send(JSON.stringify({
            success: true,
            goals: goals
        }))
    } catch {
        res.status(403).send(JSON.stringify({
            success: false,
            goals: null
        }))
    }
}

module.exports = getGoals