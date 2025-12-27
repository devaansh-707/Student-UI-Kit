import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import EmergencyAlert, { AlertStatus, AlertType } from '../models/EmergencyAlert';
import EmergencyContact from '../models/EmergencyContact';
import User from '../models/User';
import logger from '../utils/logger';
import twilio from 'twilio';

// Initialize Twilio client
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

// @desc    Create an emergency alert
// @route   POST /api/emergency-alerts
// @access  Private
export const createEmergencyAlert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { type, message, location } = req.body;
    const userId = req.user.id;

    // Get user's emergency contacts
    const contacts = await EmergencyContact.find({ userId, isVerified: true });

    if (contacts.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No verified emergency contacts found',
      });
    }

    // Create alert
    const alert = await EmergencyAlert.create({
      userId,
      type: type || 'high', // Default to high priority if not specified
      status: 'pending',
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
        address: location.address,
      },
      message,
      contactsNotified: contacts.map(contact => contact._id),
    });

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Send SMS to emergency contacts
    if (twilioClient) {
      try {
        const alertMessage = `🚨 EMERGENCY ALERT from ${user.fullName} (${user.phone}):\n` +
          `Type: ${type === 'silent' ? 'Silent Alert' : 'High Priority Alert'}\n` +
          `Message: ${message || 'No additional message provided'}\n` +
          `Location: ${location.address || 'Location shared'}\n` +
          `Map: https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

        // Send to each contact
        for (const contact of contacts) {
          await twilioClient.messages.create({
            body: alertMessage,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: contact.phone,
          });
        }

        // Update alert status to active
        alert.status = 'active';
        await alert.save();

      } catch (smsError) {
        logger.error(`Error sending SMS alerts: ${smsError}`);
        // Continue even if SMS fails
      }
    }

    res.status(201).json({
      success: true,
      data: alert,
    });
  } catch (error: any) {
    logger.error(`Error in createEmergencyAlert: ${error.message}`);
    next(error);
  }
};

// @desc    Get all emergency alerts for a user
// @route   GET /api/emergency-alerts
// @access  Private
export const getEmergencyAlerts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const alerts = await EmergencyAlert.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts,
    });
  } catch (error: any) {
    logger.error(`Error in getEmergencyAlerts: ${error.message}`);
    next(error);
  }
};

// @desc    Get a single emergency alert
// @route   GET /api/emergency-alerts/:id
// @access  Private
export const getEmergencyAlert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const alert = await EmergencyAlert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Emergency alert not found',
      });
    }

    // Make sure user owns the alert
    if (alert.userId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to view this alert',
      });
    }

    res.status(200).json({
      success: true,
      data: alert,
    });
  } catch (error: any) {
    logger.error(`Error in getEmergencyAlert: ${error.message}`);
    next(error);
  }
};

// @desc    Cancel an emergency alert
// @route   PUT /api/emergency-alerts/:id/cancel
// @access  Private
export const cancelEmergencyAlert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let alert = await EmergencyAlert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Emergency alert not found',
      });
    }

    // Make sure user owns the alert
    if (alert.userId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this alert',
      });
    }

    // Only allow cancelling active or pending alerts
    if (!['active', 'pending'].includes(alert.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel an alert that is ${alert.status}`,
      });
    }

    alert.status = 'cancelled';
    alert.cancelledAt = new Date();
    await alert.save();

    // Notify contacts that the alert has been cancelled
    if (twilioClient) {
      try {
        const user = await User.findById(req.user.id);
        const contacts = await EmergencyContact.find({
          _id: { $in: alert.contactsNotified },
          isVerified: true,
        });

        const cancelMessage = `✅ ALERT CANCELLED: The emergency alert from ${user?.fullName} has been cancelled.`;

        for (const contact of contacts) {
          await twilioClient.messages.create({
            body: cancelMessage,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: contact.phone,
          });
        }
      } catch (smsError) {
        logger.error(`Error sending cancellation SMS: ${smsError}`);
        // Continue even if SMS fails
      }
    }

    res.status(200).json({
      success: true,
      data: alert,
    });
  } catch (error: any) {
    logger.error(`Error in cancelEmergencyAlert: ${error.message}`);
    next(error);
  }
};
