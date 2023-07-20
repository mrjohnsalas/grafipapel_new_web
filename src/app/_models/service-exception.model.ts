export class ServiceException {
    result?: boolean;
    message: string;
    description?: string;
    functionName?: string;
    date?: Date;
    userId?: string;
    isNotFoundError: boolean;

    constructor(message: string, isNotFoundError: boolean, result?: boolean, description?: string, functionName?: string, date?: Date, userId?: string) {
        this.result = result;
        this.message = message;
        this.description = description;
        this.functionName = functionName;
        this.date = date;
        this.userId = userId;
        this.isNotFoundError = isNotFoundError;
    }
}