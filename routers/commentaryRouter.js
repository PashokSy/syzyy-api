import express from 'express';
import {
  createCommentary,
  getAllCommentariesByArticle,
} from '../controllers/commentaryController.js';

const router = express.Router();

router.route('/').post(createCommentary);
router.route('/:articleId').get(getAllCommentariesByArticle);

export default router;
