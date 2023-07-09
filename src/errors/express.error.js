class ExpressError {
    constructor(msg = 'Somethink went wrong', status = 400){
        this.error = true
        this.status = status;
        this.message = msg;
    }
}

module.exports = ExpressError