const router = require('express').Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const sendgridUtils = require('@utils/sendgrid')

router.post('/', async (req, res) => {
  const user = await new User(req.body).save()

  if (req.body.subscribe) {
    sendgridUtils.subscribeUser(user)
  }

  res.json({
    data: user
  })
})

module.exports = router
