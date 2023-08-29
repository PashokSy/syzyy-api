import { ArticleModel } from '../models/articles.js';

export const createArticle = async (req, res) => {
  const { text, authorId } = req.body;

  const article = await ArticleModel.create({
    text,
    authorId,
  });

  res.status(201).json({
    article,
  });
};

export const getArticle = async (req, res) => {
  const id = req.params.id;

  const article = await ArticleModel.findById(id);

  res.status(200).json({ article });
};

export const upgradeArticle = async (req, res) => {
  const { text } = req.body;
  const id = req.params.id;

  await ArticleModel.findByIdAndUpdate(id, { text });

  res.status(200).send();
};

export const deleteArticle = async (req, res) => {
  const id = req.params.id;

  await ArticleModel.findByIdAndDelete(id);

  res.status(204).send();
};
