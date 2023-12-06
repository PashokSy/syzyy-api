import express from 'express';
import {
  createArticle,
  getArticle,
  upgradeArticle,
  deleteArticle,
  getAllArticles,
} from '../controllers/articleController.js';
import { authenticationMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(authenticationMiddleware, createArticle)
  .get(getAllArticles);
router
  .route('/:id')
  .get(getArticle)
  .delete(authenticationMiddleware, deleteArticle)
  .patch(authenticationMiddleware, upgradeArticle);

export default router;
