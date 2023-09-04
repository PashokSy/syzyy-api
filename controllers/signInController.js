import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.js';
import { generateJWEToken } from '../utils/jweTokenHelper.js';
import BadRequestError from '../errors/badRequestError.js';
import ForbiddenError from '../errors/forbiddenError.js';
import NotFoundError from '../errors/notFoundError.js';

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please enter credentials');
  }

  try {
    const foundUser = await UserModel.findOne({ email });

    if (!foundUser) {
      throw new NotFoundError(`User with email '${email}' not found`);
    }

    if (!(await bcrypt.compare(password, foundUser.password)))
      throw new ForbiddenError('Wrong password');

    const jweToken = await generateJWEToken(foundUser);

    res.status(200).json({
      jweToken,
    });
  } catch (error) {
    throw error;
  }
};
