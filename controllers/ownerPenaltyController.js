const Owner = require('../models/ownerModel');
const Society = require('../models/societyModel');
const OwnerPenalty = require('../models/ownerPenaltyModel');
const sendEmail =  require("../utils/sendEmail");

const defaultPageSize = 10

// Create
const createOwnerPenalty = async (req, res) => {
    try {
      const ownerPenalty = new OwnerPenalty(req.body);
      const savedOwnerPenalty = await ownerPenalty.save();
      

      await savedOwnerPenalty.populate(["penaltyId","ownerId"]);
      // console.log(savedOwnerPenalty);

      res.status(201).json(savedOwnerPenalty);

      const owner  = await Owner.findById(savedOwnerPenalty.ownerId).populate(['flatId',"memberId"]);

      const society = await Society.findById(owner?.memberId?.societyId);


      // console.log(owner);
      let recipientMail = owner?.memberId?.email;
      let recipientName = owner?.memberId?.name;
      let societyName = society.name;
      let penaltyName = savedOwnerPenalty.penaltyId.name; 
      let penaltyAmount = savedOwnerPenalty.penaltyId.amount;
      let penaltyDecription = savedOwnerPenalty?.details;
      let penaltyImposed = savedOwnerPenalty.created;

      let penaltyDate = new Date(penaltyImposed);

      // Define options for formatting the date
      const options = {
        // weekday: "long", // full day of the week (e.g., "Monday")
        year: "numeric", // 4-digit year (e.g., "2024")
        month: "long", // full month name (e.g., "January")
        day: "numeric", // day of the month (e.g., "1")
        hour: "numeric", // hour (e.g., "1" for 1:00 AM/PM)
        minute: "numeric", // minute (e.g., "30")
        hour12: true, // 12-hour clock format (true for AM/PM)
      };

      // Format the penalty date according to the options
      let formattedPenaltyDate = penaltyDate.toLocaleString("en-US", options);

      if (recipientMail) {
        // console.log(recipientMail);
        // const subject = `Penalty Name - ${penaltyName}, Penalty Amount - ${penaltyAmount}`;
        let htmlContent;
        let subject;

        if (penaltyAmount === 0) {
          // Penalty amount is 0, display warning message
          htmlContent = `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <p>Dear ${recipientName},</p>
                <p>This is to inform you that a penalty has been recorded for the following reason: ${penaltyName}. However, the penalty amount is 0, and therefore no payment is required at this time.</p>
                <p>Please be aware that although the penalty has been recorded, there is no financial obligation associated with it.</p>
                <p>If you have any questions or concerns regarding this penalty, please feel free to contact us.</p>
                <p>Thank you for your attention to this matter.</p>
                <p><strong>Sincerely,</strong><br>
                Secretary<br>
                ${societyName}<br>
                </p>
              </div>
            `;
                subject = "Notification: " + penaltyName;

                  } else {
                    // Penalty amount is not 0, display penalty details
                    htmlContent = `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <p>Dear ${recipientName},</p>
                <p>We hope this message finds you well. We're writing to inform you that a penalty has been imposed due to ${penaltyName}. Details of the penalty are provided below:</p>
                <ul>
                  <li><strong>Penalty Name:</strong> ${penaltyName}</li>
                  <li><strong>Penalty Amount:</strong> ${penaltyAmount}</li>
                  <li><strong>Date of Imposition:</strong> ${formattedPenaltyDate}</li>
                  <li><strong>Reason for penalty:</strong> ${penaltyDecription}</li>
                </ul>
                <p>Please ensure that the penalty amount is paid within the stipulated time frame to avoid any further action. If you have any questions or concerns regarding this penalty, please don't hesitate to contact us.</p>
                <p>Thank you for your attention to this matter.</p>
                <p><strong>Sincerely,</strong><br>
                Secretary<br>
                ${societyName}<br>
                </p>
              </div>
            `;
                    subject = "Notification: " + penaltyName;
        }
        sendEmail(recipientMail, subject, htmlContent);
      }

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Read all Penalties with pagination
const getOwnerPenalties = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || defaultPageSize;

    // penaltyId, ownerId

    let query = {}; // Initialize an empty query object

    // Check if societyId is provided in the query parameters
    if (req.query.penaltyId) {
      query.penaltyId = req.query.penaltyId;
    }

    if (req.query.ownerId) {
      query.ownerId = req.query.ownerId;
    }
    

    const totalCount = await OwnerPenalty.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);

    const ownerPenalties = await OwnerPenalty.find(query).populate(["penaltyId","ownerId"])
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      ownerPenalties,
      page,
      pageSize,
      totalCount,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read a single Penalty by ID
const getOwnerPenaltyById = async (req, res) => {
  try {
    const ownerPenalty = await OwnerPenalty.findById(req.params.id);
    await ownerPenalty.populate(["penaltyId","ownerId"])

    if (!ownerPenalty) {
      return res.status(404).json({ message: 'OwnerPenalty not found' });
    }
    res.json(ownerPenalty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
const updateOwnerPenalty = async (req, res) => {
try {
  const ownerPenalty = await OwnerPenalty.findByIdAndUpdate(req.params.id, req.body, { new: true });
  await ownerPenalty.populate(["penaltyId","ownerId"])

  res.json(ownerPenalty);
} catch (error) {
  res.status(400).json({ error: error.message });
}
};

// Delete
const deleteOwnerPenalty = async (req, res) => {
try {
  const ownerPenalty = await OwnerPenalty.findByIdAndDelete(req.params.id);
  res.json({ message: 'OwnerPenalty deleted successfully', ownerPenalty });
} catch (error) {
  res.status(400).json({ error: error.message });
}
};

module.exports = {
createOwnerPenalty,
getOwnerPenalties,
updateOwnerPenalty,
deleteOwnerPenalty,
getOwnerPenaltyById
};


 