import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../controller/auth-controller';
import statsController from '../controller/stats-controller';

const router = Router();

router.post('/registration',
   body('email').isEmail(),
   body('password').isLength({ min: 3, max: 32 }),
   userController.registration
);

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.post("/stats/:userId", statsController.addStats);
router.get("/stats/:userId", statsController.getStats);
router.get('/refresh', userController.refresh);


export default router;