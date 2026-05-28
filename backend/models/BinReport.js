const mongoose = require('mongoose');

const BinReportSchema = new mongoose.Schema({
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
  status: { type: String, enum: ['empty', 'partial', 'full', 'overflowing'], required: true },
  reportedAt: { type: Date, default: Date.now },
  reporter: { type: String }, // could be user id or anonymous
});

BinReportSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('BinReport', BinReportSchema);
