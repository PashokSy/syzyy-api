import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.js';
import { generateJWEToken } from '../utils/jweTokenHelper.js';

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await UserModel.findOne({ email });

    if (!(await bcrypt.compare(password, foundUser.password)))
      throw new Error('Wrong password');

    const jweToken = await generateJWEToken(foundUser);

    res.status(200).json({
      jweToken,
    });
  } catch (error) {
    throw error;
  }
};
