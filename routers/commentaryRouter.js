import express from 'express';
import {
  createCommentary,
  deleteCommentary,
  getAllCommentariesByArticle,
} from '../controllers/commentaryController.js';

const router = express.Router();

router.route('/').post(createCommentary);
router.route('/:id').get(getAllCommentariesByArticle).delete(deleteCommentary);

export default router;
