class HttpError extends Error {
    constructor(message, errorCode, errorFields) {
        super(message);

        if (errorFields && !message) {
            this.message = this.getErrorFieldsMessage(errorFields);
        } else if (!message) {
            this.message = "Unkown error occured";
        }

        this.code = errorCode;
    }

    getErrorFieldsMessage(errorFields) {
        const joinedErrorFields = errorFields.map((e) => e.param).join(", ");
        return `Invalid values passed in for the following fields: ${joinedErrorFields}. Please check your data!`;
    }
}

module.exports = HttpError;
