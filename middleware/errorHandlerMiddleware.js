import CustomAPIError from '../errors/customAPIError.js';

export const errorHandlerMiddleware = (error, req, res, next) => {
  console.error(error);

  if (error instanceof CustomAPIError) {
    return res.status(error.statusCode).json({ errorMessage: error.message });
  }

  return res.status(500).json({ error });
};
