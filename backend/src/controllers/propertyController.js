const Property = require('../models/Property');

// @desc    Get all properties with search and filtering
// @route   GET /api/properties
exports.getProperties = async (req, res) => {
  try {
    const {
      search,
      location,
      propertyType,
      status,
      minPrice,
      maxPrice,
      sort
    } = req.query;

    const query = {};

    // 1. Search by property name (case-insensitive)
    if (search && search.trim() !== '') {
      query.propertyName = { $regex: search.trim(), $options: 'i' };
    }

    // 2. Filter by location (case-insensitive)
    if (location && location.trim() !== '') {
      query.location = { $regex: location.trim(), $options: 'i' };
    }

    // 3. Filter by property type (Residential / Commercial)
    if (propertyType && propertyType !== 'All' && propertyType !== 'All types') {
      query.propertyType = propertyType;
    }

    // 4. Filter by status (Available / Sold / Rented)
    if (status && status !== 'All' && status !== 'All statuses') {
      query.status = status;
    }

    // 5. Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice && !isNaN(Number(minPrice))) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice && !isNaN(Number(maxPrice))) {
        query.price.$lte = Number(maxPrice);
      }
    }

    // Sorting
    let sortBy = { createdAt: -1 }; // newest first by default
    if (sort === 'price_asc') sortBy = { price: 1 };
    if (sort === 'price_desc') sortBy = { price: -1 };
    if (sort === 'oldest') sortBy = { createdAt: 1 };

    const properties = await Property.find(query).sort(sortBy);

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error while fetching properties',
      error: error.message
    });
  }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: `Property not found with id ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error while fetching property',
      error: error.message
    });
  }
};

// @desc    Create a new property
// @route   POST /api/properties
exports.createProperty = async (req, res) => {
  try {
    const {
      propertyName,
      propertyType,
      description,
      location,
      price,
      area,
      bedrooms,
      bathrooms,
      status
    } = req.body;

    // Validation
    if (!propertyName || !propertyType || !location || price === undefined || area === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: propertyName, propertyType, location, price, and area'
      });
    }

    const property = await Property.create({
      propertyName,
      propertyType,
      description: description || '',
      location,
      price: Number(price),
      area: Number(area),
      bedrooms: bedrooms !== undefined ? Number(bedrooms) : 0,
      bathrooms: bathrooms !== undefined ? Number(bathrooms) : 0,
      status: status || 'Available'
    });

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: property
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error while creating property',
      error: error.message
    });
  }
};

// @desc    Update an existing property
// @route   PUT /api/properties/:id
exports.updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: `Property not found with id ${req.params.id}`
      });
    }

    // Convert numeric fields if provided
    const updateData = { ...req.body };
    if (updateData.price !== undefined) updateData.price = Number(updateData.price);
    if (updateData.area !== undefined) updateData.area = Number(updateData.area);
    if (updateData.bedrooms !== undefined) updateData.bedrooms = Number(updateData.bedrooms);
    if (updateData.bathrooms !== undefined) updateData.bathrooms = Number(updateData.bathrooms);

    property = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Property updated successfully',
      data: property
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error while updating property',
      error: error.message
    });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: `Property not found with id ${req.params.id}`
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error while deleting property',
      error: error.message
    });
  }
};
