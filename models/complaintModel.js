// complaintModel.js
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  flatId: { type: mongoose.Schema.Types.ObjectId, ref: "Flat", required: false },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'resolved'], default: 'pending' },
  title: { type: String},
  details: { type: String, required: true },
  isOwner: { type: Boolean, default: false },
  isTenant: { type: Boolean, default: false },
  comments: [
    {
      text: { type: String, required: true },
      commenterId: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
      created: { type: Date, default: Date.now }
    }
  ],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;


// for the including in this.apply.js
// const complaintRoutes = require('./routes/complaintRoutes');
// app.use('/api/complaints', complaintRoutes);

