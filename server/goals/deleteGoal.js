const db = require("../database.js")
const sessionManager = require("../sessionManager.js")

async function addToGoal(req, res) {
    const body = req.body
    try {
        let userID = sessionManager.getAccountID(body.token)

        await db.run("delete from goal where goal_id = ? and user_id = ?", [body.id, userID])

        res.status(200).send(JSON.stringify({
            success: true
        }))
    } catch(e) {
        res.status(403).send(JSON.stringify({
            success: false,
            error: e.message
        }))
    }
}

module.exports = addToGoal