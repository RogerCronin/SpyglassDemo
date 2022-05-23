class SessionManager {
    MIN_ACTIVE = 30
    sessionIDList = {
        1: 1651785941
    }

    generateSessionID() {
        return Math.floor(Date.now() * (Math.random() + 0.5))
    }

    createSession(accountID) {
        let sessionID = this.generateSessionID()
        this.sessionIDList[sessionID] = [accountID, Date.now() + this.MIN_ACTIVE * 60000]
        return sessionID
    }

    getAccountID(sessionID) {
        return this.sessionIDList[sessionID]
    }

    // TODO set up function interval
    // run every minute or so
    garbageCollect() {
        let now = Date.now()
        for(let i in Object.keys(this.sessionIDList)) {
            if(this.sessionIDList[i][1] > now) delete this.sessionIDList[i]
        }
    }
}

const manager = new SessionManager()

module.exports = manager