import { Router } from 'express';
import { body } from 'express-validator';
import {
  createEmergencyAlert,
  getEmergencyAlerts,
  getEmergencyAlert,
  cancelEmergencyAlert,
} from '../controllers/emergencyAlert.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Protect all routes
router.use(protect);

router
  .route('/')
  .get(getEmergencyAlerts)
  .post(
    [
      body('type', 'Please specify alert type (silent or high)')
        .optional()
        .isIn(['silent', 'high']),
      body('message', 'Message cannot be longer than 500 characters')
        .optional()
        .isLength({ max: 500 }),
      body('location.latitude', 'Latitude is required and must be a number')
        .exists()
        .isFloat({ min: -90, max: 90 }),
      body('location.longitude', 'Longitude is required and must be a number')
        .exists()
        .isFloat({ min: -180, max: 180 }),
      body('location.address', 'Address is required').optional().isString(),
    ],
    createEmergencyAlert
  );

router.route('/:id').get(getEmergencyAlert);
router.put('/:id/cancel', cancelEmergencyAlert);

export default router;
