const mongoose = require('mongoose')

// Create new Events Schema
const eventsSchema = new mongoose.Schema({
  // Name part of Schema should have be string and required
  title: {
    type: String,
    required: true
  },
  // Type refers to their ability and should be string and required
  date: {
    type: String,
    required: true
  },
  // This will be the pokemon's best move and should be a string and required
  time: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  // add timestamps option for createdAt and updatedAt
  timestamps: true
})

// Create a pokemon model
const Event = mongoose.model('Event', eventsSchema)

module.exports = Event
