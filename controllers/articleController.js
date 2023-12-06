import BadRequestError from '../errors/badRequestError.js';
import UnauthorizedError from '../errors/unauthorizedError.js';
import { ArticleModel } from '../models/articles.js';

export const createArticle = async (req, res) => {
  const { text, title } = req.body;
  const { _id: authorId } = req.user;

  if (!text || !title) {
    throw new BadRequestError(
      `${
        !text ? 'Text is missing' : !title ? 'Title is missing' : 'Bad request'
      }`
    );
  }

  try {
    const article = await ArticleModel.create({
      text,
      title,
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

  const { _id: authorId } = req.user;

  try {
    const article = await ArticleModel.findById(id);

    if (article?.authorId !== authorId)
      throw new UnauthorizedError('Not authorized to access this route');

    await ArticleModel.findByIdAndUpdate(id, { text });

    res.status(200).send();
  } catch (error) {
    throw error;
  }
};

export const deleteArticle = async (req, res) => {
  const id = req.params.id;
  if (!id) throw new BadRequestError('Article Id not provided');

  const { _id: authorId } = req.user;

  try {
    const article = await ArticleModel.findById(id);

    if (article?.authorId !== authorId)
      throw new UnauthorizedError('Not authorized to access this route');

    await ArticleModel.findByIdAndDelete(id);

    res.status(204).send();
  } catch (error) {
    throw error;
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find({});

    res.status(200).send(articles);
  } catch (error) {
    throw error;
  }
};
