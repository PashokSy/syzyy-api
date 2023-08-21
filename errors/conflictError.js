import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './customAPIError.js';

class ConflictError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}

export default ConflictError;
