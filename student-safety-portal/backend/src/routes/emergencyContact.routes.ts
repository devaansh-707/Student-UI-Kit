import { Router } from 'express';
import { body } from 'express-validator';
import {
  getEmergencyContacts,
  addEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
} from '../controllers/emergencyContact.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Protect all routes
router.use(protect);

router
  .route('/')
  .get(getEmergencyContacts)
  .post(
    [
      body('name', 'Name is required').notEmpty(),
      body('phone', 'Please include a valid phone number')
        .notEmpty()
        .matches(/^\+?[1-9]\d{1,14}$/),
      body('email', 'Please include a valid email').optional().isEmail(),
      body('relation', 'Please specify your relationship with this contact').notEmpty(),
    ],
    addEmergencyContact
  );

router
  .route('/:id')
  .put(
    [
      body('name', 'Name is required').optional().notEmpty(),
      body('phone', 'Please include a valid phone number')
        .optional()
        .matches(/^\+?[1-9]\d{1,14}$/),
      body('email', 'Please include a valid email').optional().isEmail(),
      body('relation', 'Please specify your relationship with this contact')
        .optional()
        .notEmpty(),
    ],
    updateEmergencyContact
  )
  .delete(deleteEmergencyContact);

export default router;
