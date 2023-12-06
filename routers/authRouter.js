import express from 'express';

import { signIn, signUp } from '../controllers/authController.js';

const router = express.Router();

router.route('/sign-in').post(signIn);
router.route('/sign-up').post(signUp);

export default router;
