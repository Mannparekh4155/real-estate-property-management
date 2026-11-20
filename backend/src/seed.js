const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Property = require('./models/Property');

dotenv.config();

const properties = [
  {
    propertyName: 'Sunrise Villa',
    propertyType: 'Residential',
    location: 'Satellite, Ahmedabad',
    description: 'Spacious 4 BHK villa with private garden and covered parking.',
    price: 12500000,
    area: 2400,
    bedrooms: 4,
    bathrooms: 4,
    status: 'Available'
  },
  {
    propertyName: 'Skyline Heights 3BHK',
    propertyType: 'Residential',
    location: 'Vesu, Surat',
    description: 'Modern apartment on the 14th floor with city views.',
    price: 7800000,
    area: 1650,
    bedrooms: 3,
    bathrooms: 3,
    status: 'Available'
  },
  {
    propertyName: 'Orbit Business Hub',
    propertyType: 'Commercial',
    location: 'SG Highway, Ahmedabad',
    description: 'Premium office floor with 24×7 power backup and ample parking.',
    price: 32000000,
    area: 5200,
    bedrooms: 0,
    bathrooms: 0,
    status: 'Available'
  },
  {
    propertyName: 'Green Valley Bungalow',
    propertyType: 'Residential',
    location: 'Bopal, Ahmedabad',
    description: 'Peaceful gated-community bungalow near schools and parks.',
    price: 9600000,
    area: 2100,
    bedrooms: 3,
    bathrooms: 3,
    status: 'Sold'
  },
  {
    propertyName: 'City Center Retail Shop',
    propertyType: 'Commercial',
    location: 'CG Road, Ahmedabad',
    description: 'Ground-floor corner shop on a high-footfall commercial street.',
    price: 18500000,
    area: 1100,
    bedrooms: 0,
    bathrooms: 0,
    status: 'Rented'
  },
  {
    propertyName: 'Lakeview 2BHK Flat',
    propertyType: 'Residential',
    location: 'Vastrapur, Ahmedabad',
    description: 'Fully furnished flat overlooking the lake, close to the metro.',
    price: 5400000,
    area: 1180,
    bedrooms: 2,
    bathrooms: 2,
    status: 'Rented'
  },
  {
    propertyName: 'Tech Park Office Suite',
    propertyType: 'Commercial',
    location: 'Gift City, Gandhinagar',
    description: 'Plug-and-play office suite inside a smart-city tech park.',
    price: 21000000,
    area: 3000,
    bedrooms: 0,
    bathrooms: 0,
    status: 'Available'
  },
  {
    propertyName: 'Heritage Row House',
    propertyType: 'Residential',
    location: 'Navrangpura, Ahmedabad',
    description: 'Beautifully restored row house in a prime central locality.',
    price: 11200000,
    area: 1900,
    bedrooms: 3,
    bathrooms: 2,
    status: 'Sold'
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('Please set MONGODB_URI in your .env file');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing
    await Property.deleteMany();
    console.log('Cleared existing properties.');

    // Insert
    await Property.insertMany(properties);
    console.log(`Successfully seeded ${properties.length} real estate properties!`);

    process.exit();
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedDB();
