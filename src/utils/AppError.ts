class AppError extends Error {
    public message: string
    public statusCode: number
    public errorObj: any
    constructor(message: string, statusCode: number, errorObj: any= {}) {
        super(message);
        this.message = message
        this.statusCode = statusCode
        this.errorObj = errorObj

        Error.captureStackTrace(this, this.constructor)

    }
}

export default AppError