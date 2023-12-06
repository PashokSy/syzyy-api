import UnauthorizedError from '../errors/unauthorizedError.js';
import { decryptJWEToken } from '../utils/jweTokenHelper.js';

export const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('No token provided');
  }

  const tokenArr = authHeader.split(' ');

  if (
    tokenArr.length !== 2 ||
    tokenArr.at(0) !== 'Bearer' ||
    tokenArr.at(1).length === 0
  ) {
    throw new UnauthorizedError('Invalid token provided');
  }

  const token = tokenArr.at(1);

  try {
    const decoded = await decryptJWEToken(token);

    req.user = JSON.parse(decoded);

    next();
  } catch (error) {
    console.error(error);
    throw new UnauthorizedError('Not authorized to access this route');
  }
};
