const db = require("../database.js")

async function handleDBRequest(req, res) {
    const body = req.body
    try {
        if(body.type == 0) {
            await db.run(body.query)
            res.status(200).send(JSON.stringify({
                success: true,
                output: null
            }))
        } else if(body.type == 1) {
            let rows = await db.all(body.query)
            res.status(200).send(JSON.stringify({
                success: true,
                output: rows
            }))
        }
    } catch(e) {
        res.status(400).send(JSON.stringify({
            success: false,
            output: e
        }))
    }
}

module.exports = handleDBRequest