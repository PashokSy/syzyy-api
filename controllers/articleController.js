import BadRequestError from '../errors/badRequestError.js';
import { ArticleModel } from '../models/articles.js';

export const createArticle = async (req, res) => {
  const { text, authorId } = req.body;

  if (!text || !authorId) {
    throw new BadRequestError(
      `${
        !text
          ? 'Text is missing'
          : !authorId
          ? 'Author id is missing'
          : 'Bad request'
      }`
    );
  }

  try {
    const article = await ArticleModel.create({
      text,
      authorId,
    });

    res.status(201).json({
      article,
    });
  } catch (error) {
    throw error;
  }
};

export const getArticle = async (req, res) => {
  const id = req.params.id;
  if (!id) throw new BadRequestError('Article Id not provided');

  try {
    const article = await ArticleModel.findById(id);

    res.status(200).json({ article });
  } catch (error) {
    throw error;
  }
};

export const upgradeArticle = async (req, res) => {
  const { text } = req.body;
  if (text.trim() === '')
    throw new BadRequestError('Article text can not be empty');

  const id = req.params.id;
  if (!id) throw new BadRequestError('Article Id not provided');

  try {
    await ArticleModel.findByIdAndUpdate(id, { text });

    res.status(200).send();
  } catch (error) {
    throw error;
  }
};

export const deleteArticle = async (req, res) => {
  const id = req.params.id;
  if (!id) throw new BadRequestError('Article Id not provided');

  try {
    await ArticleModel.findByIdAndDelete(id);

    res.status(204).send();
  } catch (error) {
    throw error;
  }
};
