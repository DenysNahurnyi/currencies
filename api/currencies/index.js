'use strict'

const express = require(`express`)
const router = express.Router()

const controller = require(`./currencies.controller`)


router.get(`/`, 
	// Token validation
	controller.getCurrencyDescriptionRoute)

router.get(`/rates`, 
	// Token validation
	controller.getCurrencyValuesRoute)

router.get(`/rates/:abbr`, 
	// Token validation
	controller.getCurrencyDetailsRoute)

router.put(`/update`, 
	// Token validation
	controller.updateCurrencyData)

router.get(`/test`, 
	// Token validation
	controller.testRoute)

module.exports = router