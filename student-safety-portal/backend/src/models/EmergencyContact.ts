import mongoose, { Document, Schema } from 'mongoose';

export interface IEmergencyContact extends Document {
  name: string;
  phone: string;
  email?: string;
  relation: string;
  isVerified: boolean;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const EmergencyContactSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for the contact'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
      match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number'],
    },
    email: {
      type: String,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        'Please provide a valid email',
      ],
      lowercase: true,
      trim: true,
    },
    relation: {
      type: String,
      required: [true, 'Please specify your relationship with this contact'],
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<IEmergencyContact>('EmergencyContact', EmergencyContactSchema);
