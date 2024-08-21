import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: { type: String, unique: true, required: true }, 
    description: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
    
    },
    content: {
      type: String,
      required: true
    },
    feature_img: {
      type: String, // URL of the image uploaded to AWS S3
      required: true
    },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true } // This automatically creates `createdAt` and `updatedAt` fields
);

const Service = mongoose.models.Service || mongoose.model('Service', PostSchema);

export default Service;
