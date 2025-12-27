import mongoose, { Document, Schema } from 'mongoose';

export type AlertStatus = 'pending' | 'active' | 'resolved' | 'cancelled';
export type AlertType = 'silent' | 'high';

export interface IEmergencyAlert extends Document {
  userId: mongoose.Types.ObjectId;
  type: AlertType;
  status: AlertStatus;
  location: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
    address?: string;
  };
  message?: string;
  contactsNotified: mongoose.Types.ObjectId[];
  resolvedAt?: Date;
  cancelledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const EmergencyAlertSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    type: {
      type: String,
      enum: ['silent', 'high'],
      required: [true, 'Alert type is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'resolved', 'cancelled'],
      default: 'pending',
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: [true, 'Location coordinates are required'],
        validate: {
          validator: function (value: number[]) {
            return value.length === 2 && 
                   value[0] >= -180 && value[0] <= 180 && 
                   value[1] >= -90 && value[1] <= 90;
          },
          message: 'Invalid coordinates. Must be [longitude, latitude] with valid values.',
        },
      },
      address: String,
    },
    message: {
      type: String,
      maxlength: [500, 'Message cannot be longer than 500 characters'],
    },
    contactsNotified: [
      {
        type: Schema.Types.ObjectId,
        ref: 'EmergencyContact',
      },
    ],
    resolvedAt: Date,
    cancelledAt: Date,
  },
  { timestamps: true, versionKey: false }
);

// Create 2dsphere index for geospatial queries
EmergencyAlertSchema.index({ 'location.coordinates': '2dsphere' });

export default mongoose.model<IEmergencyAlert>('EmergencyAlert', EmergencyAlertSchema);
