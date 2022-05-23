const db = require("../database.js")
const sessionManager = require("../sessionManager.js")

async function getGoal(req, res) {
    const body = req.body
    try {
        let userID = sessionManager.getAccountID(body.token)
        let goal = await db.all("select * from 'goal' where user_id = ? and goal_id = ?", [userID, body.id])
        if(goal.length === 0) throw new Error()
        res.status(200).send(JSON.stringify({
            success: true,
            goal: goal[0]
        }))
    } catch {
        res.status(403).send(JSON.stringify({
            success: false,
            goals: null
        }))
    }
}

module.exports = getGoal