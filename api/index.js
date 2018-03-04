'use strict'

const express = require(`express`)
const router = express.Router()

router.use(`/`, require(`./currency/`))
router.use(`/token`, require(`./auth/`))

module.exports = router