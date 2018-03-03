'use strict'

const express = require(`express`)
const router = express.Router()

const controller = require(`./currencies.controller`)


router.get(`/`, 
	// Token validation
	controller.getCurrencies)

module.exports = router