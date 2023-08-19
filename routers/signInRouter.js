import express from 'express';

import { signIn } from '../controllers/signInController.js';

const router = express.Router();

router.route('/sign-in').post(signIn);

export default router;
