const httpResponse = function () {
    this.success = true;
    this.error = false;
    this.message = "";
    this.data = [];

    this.setError = (err) => {
        this.success = false;
        this.error = true;
        this.message = err;
    }
}

module.exports = httpResponse;