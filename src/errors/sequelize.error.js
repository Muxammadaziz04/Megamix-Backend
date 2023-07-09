class SequelizeError {
    constructor(err, status = 400) {
        this.error = true;
        this.message = Array.isArray(err?.errors) ? err?.errors?.[0]?.message : err.message
        this.status = status
    }
}

module.exports = SequelizeError