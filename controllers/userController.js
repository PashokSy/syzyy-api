import BadRequestError from '../errors/badRequestError.js';
import { UserModel } from '../models/user.js';

export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) throw new BadRequestError('No id provided');

  try {
    const user = await UserModel.findById(id);

    res.status(200).json({ user });
  } catch (error) {}
};
