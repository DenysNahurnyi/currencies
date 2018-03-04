'use strict'

const express = require(`express`)
const router = express.Router()

const controller = require(`./currency.controller`)
const authTokenUtil = require(`../../utils/authToken`)


router.get(`/`, 
	authTokenUtil.verifyTokenMiddleware,
	controller.getCurrencyDescriptionRoute)

router.get(`/rates`, 
	authTokenUtil.verifyTokenMiddleware,
	controller.getCurrencyValuesRoute)

router.get(`/rates/:abbr`, 
	authTokenUtil.verifyTokenMiddleware,
	controller.getCurrencyDetailsRoute)

router.put(`/update`, 
	authTokenUtil.verifyTokenMiddleware,
	controller.updateCurrencyDataRoute)

module.exports = router