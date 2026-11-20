const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    propertyName: {
      type: String,
      required: [true, 'Property name is required'],
      trim: true,
      maxlength: [100, 'Property name cannot exceed 100 characters']
    },
    propertyType: {
      type: String,
      required: [true, 'Property type is required'],
      enum: {
        values: ['Residential', 'Commercial'],
        message: '{VALUE} is not a valid property type. Must be Residential or Commercial'
      }
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number']
    },
    area: {
      type: Number,
      required: [true, 'Area (sq. ft.) is required'],
      min: [0, 'Area must be a positive number']
    },
    bedrooms: {
      type: Number,
      default: 0,
      min: [0, 'Bedrooms cannot be negative']
    },
    bathrooms: {
      type: Number,
      default: 0,
      min: [0, 'Bathrooms cannot be negative']
    },
    status: {
      type: String,
      enum: {
        values: ['Available', 'Sold', 'Rented'],
        message: '{VALUE} is not a valid status. Must be Available, Sold, or Rented'
      },
      default: 'Available'
    }
  },
  {
    timestamps: true // Automatically creates createdAt and updatedAt
  }
);

// Add index for fast search and filtering
propertySchema.index({ propertyName: 'text', location: 'text' });

module.exports = mongoose.model('Property', propertySchema);
