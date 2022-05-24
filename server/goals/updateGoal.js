const db = require("../database.js")
const sessionManager = require("../sessionManager.js")

async function updateGoal(req, res) {
    const body = req.body
    try {
        let userID = sessionManager.getAccountID(body.token)
        await db.run("update goal set title = ?, description = ?, target_amount = ?, target_date = ?, type = ?, icon = ? where goal_id = ? and user_id = ?", [
            body.title,
            body.description,
            body.targetAmount,
            body.targetDate,
            body.type,
            body.icon,
            body.id,
            userID
        ])
        res.status(200).send(JSON.stringify({
            success: true
        }))
    } catch(e) {
        console.log(e)
        res.status(403).send(JSON.stringify({
            success: false
        }))
    }
}

module.exports = updateGoal