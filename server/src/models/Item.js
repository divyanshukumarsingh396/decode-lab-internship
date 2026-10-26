import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['Electronics', 'Documents', 'Books', 'Clothing', 'Accessories', 'Personal Items', 'Bags', 'Keys', 'Other'],
      required: true,
    },
    type: { type: String, enum: ['lost', 'found'], required: true },
    image: { type: String, default: '' },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    additionalDetails: { type: String, default: '' },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['open', 'claim requested', 'claimed', 'resolved'],
      default: 'open',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Item', itemSchema);
