import express from 'express';
import {
  createArticle,
  getArticle,
  upgradeArticle,
  deleteArticle,
} from '../controllers/articleController.js';

const router = express.Router();

router.route('/').post(createArticle);
router
  .route('/:id')
  .get(getArticle)
  .delete(deleteArticle)
  .patch(upgradeArticle);

export default router;
