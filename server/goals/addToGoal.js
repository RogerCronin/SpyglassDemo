const db = require("../database.js")
const sessionManager = require("../sessionManager.js")

async function addToGoal(req, res) {
    const body = req.body
    try {
        body.value = Math.round(body.value * 100) / 100
        let userID = sessionManager.getAccountID(body.token)
        let balance = (await db.all("select bank_user.balance from bank_user inner join user on bank_user.account_number = user.account_number and bank_user.routing_number = user.routing_number where user.user_id = ?", userID))[0].balance
        if(balance === null || balance === undefined) throw new Error()
        let goalAmounts = (await db.all("select current_amount from goal where user_id = ?", userID)).reduce((a, c) => a + c.current_amount, 0)
        if(goalAmounts > balance) throw new Error()
        if(balance - (goalAmounts + body.value) < 0) throw new Error()
        if(body.value <= 0) throw new Error()

        await db.run("update goal set current_amount = current_amount + ? where goal_id = ? and user_id = ?", [body.value, body.id, userID])

        res.status(200).send(JSON.stringify({
            success: true
        }))
    } catch {
        res.status(403).send(JSON.stringify({
            success: false
        }))
    }
}

module.exports = addToGoal