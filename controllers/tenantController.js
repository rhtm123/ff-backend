const Tenant = require('../models/tenantModel');
const Owner = require('../models/ownerModel');
const Member = require('../models/memberModel');

const defaultPageSize = 10;
const cloudinary = require('cloudinary').v2;


/**
 * Create a new tenant.
 */
const createTenant = async (req, res) => {
  try {

    const lastOwner = await Owner.findOne({ flatId: req.body.flatId }, {}, { sort: { 'created': -1 } });

    // Set ownerId to the last ownerId or null if not found
    const ownerId = lastOwner ? lastOwner._id : null;

    // Create a new Tenant with the ownerId set
    const tenant = new Tenant({ ...req.body, ownerId });

    const savedTenant = await tenant.save();
    await savedTenant.populate(["flatId","memberId","ownerId"]);

    res.status(201).json(savedTenant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get paginated list of tenants.
 * Query parameters: page, pageSize, flatId, memebrId
 */
const getTenants = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || defaultPageSize;

    let memberQuery = {}; // Initialize an empty query object for members

    // Check if search query is provided for member's name
    if (req.query.search) {
      // Add a regex search for the nested memberId.name field
      memberQuery.name = { $regex: new RegExp(req.query.search, 'i') };
    }

    if (req.query.societyId) {
      memberQuery.societyId = req.query.societyId;
    }

    // Find members with the given name query
    const members = await Member.find(memberQuery);
    const memberIds = members.map(member => member._id);


    // Check if builderId is provided in the query parameters
    let query = {}; // Initialize an empty query object


    if (req.query.flatId) {
      query.flatId = req.query.flatId;
    }

    if (req.query.memberId) {
      query.memberId = req.query.memberId;
    }

    if (memberIds.length > 0) {
      query.memberId = { $in: memberIds };
    }


    const totalCount = await Tenant.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);

    const tenants = await Tenant.find(query).populate(["flatId","memberId","ownerId"])
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      tenants,
      page,
      pageSize,
      totalCount,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get a tenant by ID.
 */
const getTenantById = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id).populate(["flatId","memberId","ownerId"]);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    await tenant.populate(['memberId', 'flatId']);

    res.json(tenant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update a tenant by ID.
 */
const updateTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(["flatId","memberId","ownerId"]);
    // await tenant.populate(['memberId', 'flatId']);

    res.json(tenant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Delete a tenant by ID.
 */
const deleteTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndDelete(req.params.id);
    if (tenant) {
      await tenant.removeWithFamily();
    }
    res.json({ message: 'Tenant deleted successfully', tenant });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const uploadFile = async (req, res) => {
  // Upload the file to Cloudinary
  const tenant = await Tenant.findById(req.params.id);
  // console.log(req.body);

  if (!tenant) {
    return res.status(404).json({ message: 'Tenant not found' });
  }

  cloudinary.uploader.upload(req.file.path, 
    { folder: 'ss/tenants',
    } ,async (err, result) => {
    if (err) {
      // Handle error
      console.error(err);
      return res.status(500).json({ message: 'Upload failed' });
    }
    // File uploaded successfully, send back Cloudinary response


    // console.log(req.body)
    if (req.body.fileType === 'agreement') {
      if (tenant.agreementFilePublicId) {
        cloudinary.uploader.destroy(tenant.agreementFilePublicId, async (error, result) => {
        });
      } 

      tenant.agreementFile = result.secure_url;
      tenant.agreementFilePublicId = result.public_id;

      

    } else if (req.body.fileType === 'policeVerification') {
      if (tenant.policeVerificationFilePublicId) {
        cloudinary.uploader.destroy(tenant.policeVerificationFilePublicId, async (error, result) => {
        });
      } 
      
      tenant.policeVerificationFile = result.secure_url;
      tenant.policeVerificationFilePublicId = result.public_id;
      

      

    } else {
      // Handle unexpected file type (should ideally never reach here)
      console.error("Unknown file type:", req.body.fileType);
      return res.status(500).json({ message: 'Unexpected error' }); // Or send a more specific error message
    }
  
    await tenant.save();
    await tenant.populate(["flatId","memberId","ownerId"])
    res.json(tenant);
  
  });
};

module.exports = {
  createTenant,
  getTenants,
  updateTenant,
  deleteTenant,
  getTenantById,
  uploadFile
};
