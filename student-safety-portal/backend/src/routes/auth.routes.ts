import { Router } from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  getMe,
  logout,
  updateDetails,
  updatePassword,
} from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post(
  '/register',
  [
    body('fullName', 'Please include a name with at least 2 characters')
      .notEmpty()
      .isLength({ min: 2 }),
    body('email', 'Please include a valid email').isEmail(),
    body(
      'password',
      'Please enter a password with 8 or more characters'
    ).isLength({ min: 8 }),
    body('phone', 'Please include a valid phone number')
      .notEmpty()
      .matches(/^\+?[1-9]\d{1,14}$/),
  ],
  register
);

router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  login
);

// Protected routes
router.use(protect);

router.get('/me', getMe);
router.post('/logout', logout);
router.put(
  '/updatedetails',
  [
    body('fullName', 'Please include a name')
      .optional()
      .isLength({ min: 2 }),
    body('email', 'Please include a valid email').optional().isEmail(),
    body('phone', 'Please include a valid phone number')
      .optional()
      .matches(/^\+?[1-9]\d{1,14}$/),
  ],
  updateDetails
);
router.put(
  '/updatepassword',
  [
    body('currentPassword', 'Current password is required').exists(),
    body('newPassword', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
  ],
  updatePassword
);

export default router;
