import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import EmergencyContact from '../models/EmergencyContact';
import logger from '../utils/logger';

// @desc    Get all emergency contacts for a user
// @route   GET /api/emergency-contacts
// @access  Private
export const getEmergencyContacts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await EmergencyContact.find({ userId: req.user.id });
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error: any) {
    logger.error(`Error in getEmergencyContacts: ${error.message}`);
    next(error);
  }
};

// @desc    Add a new emergency contact
// @route   POST /api/emergency-contacts
// @access  Private
export const addEmergencyContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, phone, email, relation } = req.body;

    const contact = await EmergencyContact.create({
      name,
      phone,
      email,
      relation,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: contact,
    });
  } catch (error: any) {
    logger.error(`Error in addEmergencyContact: ${error.message}`);
    next(error);
  }
};

// @desc    Update an emergency contact
// @route   PUT /api/emergency-contacts/:id
// @access  Private
export const updateEmergencyContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    let contact = await EmergencyContact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Emergency contact not found',
      });
    }

    // Make sure user owns the contact
    if (contact.userId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this contact',
      });
    }

    contact = await EmergencyContact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error: any) {
    logger.error(`Error in updateEmergencyContact: ${error.message}`);
    next(error);
  }
};

// @desc    Delete an emergency contact
// @route   DELETE /api/emergency-contacts/:id
// @access  Private
export const deleteEmergencyContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contact = await EmergencyContact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Emergency contact not found',
      });
    }

    // Make sure user owns the contact
    if (contact.userId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this contact',
      });
    }

    await EmergencyContact.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error: any) {
    logger.error(`Error in deleteEmergencyContact: ${error.message}`);
    next(error);
  }
};
