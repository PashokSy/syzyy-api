import express from 'express';

import { getAuthor } from '../controllers/authorController.js';

const router = express.Router();

router.route('/:id').get(getAuthor);

export default router;
