// Require in the pokemonSchema
const Event = require('./../models/events')

// require in express
const express = require('express')

// require in router
const router = express.Router()

// require passport
const passport = require('passport')

// handle404 error
const handle404 = require('./../../lib/custom_errors')

const customErrors = require('../../lib/custom_errors')

const removeBlanks = require('../../lib/remove_blank_fields')

const requireOwnership = customErrors.requireOwnership

// require Token
const requireToken = passport.authenticate('bearer', { session: false })

// Create router
router.post('/event', requireToken, (req, res, next) => {
  req.body.event.owner = req.user._id
  const eventData = req.body.event
  // use our Event model
  Event.create(eventData)
  // event created successfully
    .then(event => {
      res.status(201).json({ event })
    })
    // Create error
    .catch(next)
})

// Index router
router.get('/event', requireToken, (req, res, next) => {
  Event.find({owner: req.user.id})
    // .populate('owner')
    .then(event => {
      return event.map(event => event.toObject())
    })
    .then(event => {
      res.status(201).json({ event })
    })
    .catch(next)
})

// Show router
router.get('/event/:id', requireToken, (req, res, next) => {
  const id = req.params.id

  Event.findById(id)
    .populate('owner')
    .then(handle404)
    .then(event => res.status(200).json({ event }))
    .catch(next)
})

// Update router
router.patch('/event/:id', requireToken, removeBlanks, (req, res, next) => {
  Event.findById(req.params.id)
    .then(handle404)
    .then(event => {
      requireOwnership(req, event)
      return event.updateOne(req.body.event)
    })
    .then(event => res.json({ event }))
    .catch(next)
})

// Destroy router
router.delete('/event/:id', requireToken, (req, res, next) => {
  const id = req.params.id

  Event.findById(id)
    .then(handle404)
    .then(event => {
      requireOwnership(req, event)
      event.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
