export class ErrorsDTO {
    errors: Error[];
    constructor() {
        this.errors = [];
    }
}

export class Error {
    id: string;
    message: string;
}