const sql = require("sqlite3").verbose()

class Database {
    db

    init() {
        this.db = new sql.Database("server/database.db")
    }

    run(query, params) {
        return new Promise((res, rej) => {
            this.db.run(query, params, err => {
                if(err) rej(err)
                res()
            })
        })
    }

    all(query, params) {
        return new Promise((res, rej) => {
            this.db.all(query, params, (err, rows) => {
                if(err) rej(err)
                res(rows)
            })
        })
    }

    currentTimestamp() {
        return Date.now()
    }
}

module.exports = new Database()