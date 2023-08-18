import express from 'express';

const router = express.Router();

import { signUp } from '../controllers/signUpController.js';

router.route('/sign-up').post(signUp);

export default router;
