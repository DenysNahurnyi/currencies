'use strict'

const express = require(`express`)
const router = express.Router()

const controller = require(`./currencies.controller`)


router.get(`/`, 
	// Token validation
	controller.getCurrenciesRoute)

router.get(`/test`, 
	// Token validation
	controller.test)

module.exports = router