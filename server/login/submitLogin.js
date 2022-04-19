async function submitLogin(req, res) {
    const body = req.body
    console.log(body)
    if(body.username == "asdf" && body.password == "1234") {
        res.status(200).send(JSON.stringify({
            success: true,
            sessionID: 1
        }))
    } else {
        res.status(403).send(JSON.stringify({
            success: false,
            sessionID: null
        }))
    }
}

module.exports = submitLogin