'use strict'

const express = require(`express`)
const router = express.Router()

const controller = require(`./currencies.controller`)
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
	controller.updateCurrencyData)

router.get(`/test`, 
	authTokenUtil.verifyTokenMiddleware,
	controller.testRoute)

module.exports = router