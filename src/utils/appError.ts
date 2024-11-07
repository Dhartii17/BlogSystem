class appError extends Error {
    statusCode: any;
    // isOperational: boolean;
    constructor(statusCode: any, message: any) {
        super(message);
        this.statusCode = statusCode;
        // this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor)
    }
}

export { appError };