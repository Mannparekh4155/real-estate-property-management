const Property = require('../models/Property');

// @desc    Get dashboard metrics (Total, Available, Sold, Rented, Total Portfolio Value)
// @route   GET /api/dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    // 1. Dynamic counts calculated from MongoDB
    const [totalProperties, availableProperties, soldProperties, rentedProperties] = await Promise.all([
      Property.countDocuments(),
      Property.countDocuments({ status: 'Available' }),
      Property.countDocuments({ status: 'Sold' }),
      Property.countDocuments({ status: 'Rented' })
    ]);

    // 2. Dynamic sum of total property value using MongoDB Aggregation
    const valueAggregation = await Property.aggregate([
      {
        $group: {
          _id: null,
          totalValue: { $sum: '$price' }
        }
      }
    ]);

    const totalPropertyValue = valueAggregation.length > 0 ? valueAggregation[0].totalValue : 0;

    res.status(200).json({
      success: true,
      data: {
        totalProperties,
        availableProperties,
        soldProperties,
        rentedProperties,
        totalPropertyValue
      }
    });
  } catch (error) {
    console.error('Error calculating dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error while calculating dashboard stats',
      error: error.message
    });
  }
};
