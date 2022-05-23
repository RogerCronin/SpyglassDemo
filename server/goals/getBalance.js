const db = require("../database.js")
const sessionManager = require("../sessionManager.js")

async function getBalance(req, res) {
    const body = req.body
    try {
        let userID = sessionManager.getAccountID(body.token)

        let balance = (await db.all("select bank_user.balance from bank_user inner join user on bank_user.account_number = user.account_number and bank_user.routing_number = user.routing_number where user.user_id = ?", userID))[0].balance
        if(balance === null || balance === undefined) throw new Error()
        let goalAmounts = (await db.all("select current_amount from goal where user_id = ?", userID)).reduce((a, c) => a + c.current_amount, 0)
        if(goalAmounts > balance) throw new Error()

        res.status(200).send(JSON.stringify({
            success: true,
            balance: Math.round((balance - goalAmounts) * 100) / 100
        }))
    } catch {
        res.status(403).send(JSON.stringify({
            success: false,
            balance: null
        }))
    }
}

module.exports = getBalance