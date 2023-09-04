import { generateJWEToken } from '../utils/jweTokenHelper.js';
import { UserModel } from '../models/user.js';
import ConflictError from '../errors/conflictError.js';
import BadRequestError from '../errors/badRequestError.js';

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName, nickName } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please enter credentials');
  }

  try {
    if (await UserModel.findOne({ email }))
      throw new ConflictError(`User with email '${email}' already exist`);

    const user = await UserModel.create({
      email,
      password,
      firstName,
      lastName,
      nickName,
    });

    const jweToken = await generateJWEToken(user);

    res.status(201).json({
      jweToken,
    });
  } catch (error) {
    throw error;
  }
};
