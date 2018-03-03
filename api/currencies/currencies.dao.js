'use strict'

const currencyModel = require('../../models/currency.model')
const currencyDescriptionModel = require('../../models/currencyDescription.model')
const logModel = require('../../models/log.model')
const errorHelper = require('../../utils/errorHelper')

module.exports.createCurrencyDescription = data => 
	currencyDescriptionModel.create(data)

module.exports.createCurrencyValue = data => 
	currencyModel.create(data)

module.exports.dropCurrencyDescription = () => 
	currencyDescriptionModel.remove({})

module.exports.dropCurrencyValues = () => 
	currencyModel.remove({})

module.exports.getCurrencyDescriptions = () =>
	currencyDescriptionModel.find({})

module.exports.getCurrencyValues = () =>
	currencyModel.find({})

module.exports.logEvent = eventMsg =>
	logModel.create({
		event: eventMsg
	})

module.exports.logError = errorMsg =>
	logModel.create({
		event: errorMsg
	})