const db = require("../database.js")
const bcrypt = require("bcrypt")

async function makeNewAccount(req, res) {
    const body = req.body
    try {
        if(!(body.email
            && body.firstName
            && body.lastName
            && body.password
            && body.accountNumber
            && body.routingNumber
            && body.ssn)) throw new Error("One or more form items required")
        if(!isEmailAddress(body.email)) throw new Error("Invalid email address")
        if(body.firstName.length > 45) throw new Error("First name too long")
        if(body.lastName.length > 45) throw new Error("Last name too long")
        let goodPass = goodPassword(body.password)
        if(goodPass) throw new Error(`Weak password: ${goodPass}`)
        if(body.accountNumber.length > 17 || body.accountNumber.length < 5 || !isNumeric(body.accountNumber)) throw new Error("Invalid account number")
        if(body.routingNumber.length !== 9 || !isNumeric(body.routingNumber)) throw new Error("Invalid routing number")
        if(!isSSN(body.ssn)) throw new Error("Invalid SSN")

        let existingUser = await db.all("select 1 from 'user' where account_number = ? and routing_number = ?", [body.accountNumber, body.routingNumber])
        if(existingUser.length !== 0) throw new Error("Bank account already registered")
        existingUser = await db.all("select 1 from 'user' where email = ?", [body.email])
        if(existingUser.length !== 0) throw new Error("Email already registered")

        let rows = await db.all("select 1 from 'bank_user' where account_number = ? and routing_number = ? and ssn = ?", [body.accountNumber, body.routingNumber, body.ssn.replace(/-/g, "")])

        if(rows.length !== 0) {
            let pass = await bcrypt.hash(body.password, 12)
            await db.run(`insert into 'user' ('user_id', 'account_number', 'routing_number', 'email', 'first_name', 'last_name', 'password') values (?, ?, ?, ?, ?, ?, ?)`, [
                db.currentTimestamp(),
                body.accountNumber,
                body.routingNumber,
                body.email,
                body.firstName,
                body.lastName,
                pass
            ])
            res.status(200).send(JSON.stringify({
                success: true
            }))
        } else throw new Error("Could not find bank account")
    } catch(e) {
        res.status(400).send(JSON.stringify({
            success: false,
            error: e.message
        }))
    }
}

function isSSN(value) {
    value = value.replace(/-/g, "")
    return isNumeric(value) && value.length === 9
}

function isNumeric(value) {
    return /^\d+$/.test(value)
}

function isEmailAddress(value) {
    return value.length < 128 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
}

function goodPassword(value) {
    if(value.length < 8) return "Must be at least 8 characters"
    if(!/[A-Z]/.test(value)) return "Must contain at least 1 uppercase character"
    if(!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value)) return "Must contain at least 1 special character"
    if(!/[0-9]/.test(value)) return "Must contain at least 1 number"
}

module.exports = makeNewAccount