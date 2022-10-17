export class HttpStatusCodeError extends Error {
    status;  
    errorCodes;
  
    constructor(status, message = undefined, errorCodes = undefined) {
      super(message || `Request failed with status code ${status}`);
      this.status = status;
      this.errorCodes = errorCodes;
    }
  }