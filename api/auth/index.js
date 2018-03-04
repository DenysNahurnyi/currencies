'use strict'

const express = require(`express`)
const router = express.Router()

const controller = require(`./auth.controller`)

router.get(`/`, 
	controller.getToken)

module.exports = router