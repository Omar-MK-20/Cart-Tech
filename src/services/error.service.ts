export class RequestError extends Error
{
    status?: number;
    payload?: unknown;

    constructor(message: string, status?: number, payload?: unknown)
    {
        super(message);
        this.name = "RequestError";
        this.status = status;
        this.payload = payload;
    }
}