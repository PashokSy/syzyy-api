import BadRequestError from '../errors/badRequestError.js';
import { UserModel } from '../models/user.js';

export const getAuthor = async (req, res) => {
  const { id } = req.params;

  if (!id) throw new BadRequestError('No id provided');

  try {
    const { nickName } = await UserModel.findById(id);
    console.log(nickName);

    res.status(200).json({ nickName });
  } catch (error) {}
};
