import express from 'express';

import { signUp } from '../controllers/signUpController.js';

const router = express.Router();

router.route('/sign-up').post(signUp);

export default router;
