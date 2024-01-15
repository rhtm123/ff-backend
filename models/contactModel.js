const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email : { type: String},
    message : { type: String},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
  });
  
  const Contact = mongoose.model("Contact", contactSchema);
  
  module.exports = Contact;