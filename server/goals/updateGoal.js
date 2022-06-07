const db = require("../database.js")
const sessionManager = require("../sessionManager.js")

async function updateGoal(req, res) {
    const body = req.body
    try {
        if(!existCheck(body.title, body.targetAmount, body.targetDate, body.type, body.id)) throw new Error("One or more form items required")

        let userID = sessionManager.getAccountID(body.token)

        if(body.title.length < 0) throw new Error("Invalid title")
        if(body.title.length > 45) throw new Error("Title too long")
        if(body.targetAmount < 0) throw new Error("Invalid target amount")
        if(body.targetAmount > 9999999) throw new Error("Target amount too large")

        if(body.targetDate < 1641038400 || !isNumeric(body.targetDate)) throw new Error("Invalid target date")
        if(body.targetDate > 4102488000) throw new Error("Target date too far in future")

        if(body.type < 0 || body.type > 6 || !isNumeric(body.type)) throw new Error("Invalid goal type")

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
        res.status(403).send(JSON.stringify({
            success: false,
            error: e.message
        }))
    }
}

function existCheck() {
    for(let i of arguments) {
        if(i === null || i === undefined || i === "") return false
    }
    return true
}

function isNumeric(value) {
    return /^\d+$/.test(value)
}

module.exports = updateGoal