import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './customAPIError.js';

class UnsupportedMediaTypeError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNSUPPORTED_MEDIA_TYPE;
  }
}

export default UnsupportedMediaTypeError;
