import { CommentaryModel } from '../models/commentaries.js';
import { ArticleModel } from '../models/articles.js';
import BadRequestError from '../errors/badRequestError.js';
import NotFoundError from '../errors/notFoundError.js';

export const createCommentary = async (req, res) => {
  const { text, authorId, articleId } = req.body;

  if (!text || !authorId || !articleId) {
    throw new BadRequestError(
      `${
        !text
          ? 'Text is missing'
          : !authorId
          ? 'Author id is missing'
          : !articleId
          ? 'Article id is missing'
          : 'Bad request'
      }`
    );
  }

  try {
    const article = await ArticleModel.findById(articleId);
    if (!article) throw NotFoundError('Article not found');

    const commentary = await CommentaryModel.create({
      text,
      authorId,
      articleId,
    });

    article.comments.push(commentary.id);
    await ArticleModel.findByIdAndUpdate(article.id, { ...article });

    res.status(201).json({ commentary });
  } catch (error) {
    throw error;
  }
};

export const getAllCommentariesByArticle = async (req, res) => {
  const articleId = req.params.id;
  if (!articleId) throw new BadRequestError('Article Id not provided');

  try {
    const commentaries = await CommentaryModel.find({ articleId });

    res.status(200).json(commentaries);
  } catch (error) {
    throw error;
  }
};

export const deleteCommentary = async (req, res) => {
  const id = req.params.id;
  if (!id) throw new BadRequestError('Commentary Id not provided');

  try {
    await CommentaryModel.findByIdAndDelete(id);

    res.status(204).send();
  } catch (error) {
    throw error;
  }
};

// TODO fix routing
// export const getCommentariesByAuthor = async (req, res) => {
//   const authorId = req.params.authorId;
//   console.log(authorId);

//   if (!authorId) throw new BadRequestError('Author Id not provided');

//   try {
//     const commentaries = await CommentaryModel.find({ authorId });

//     res.status(200).json(commentaries);
//   } catch (error) {
//     throw error;
//   }
// };
