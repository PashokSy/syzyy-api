import { generateJWEToken } from '../utils/jweTokenHelper.js';
import { UserModel } from '../models/user.js';

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName, nickName } = req.body;

  try {
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
