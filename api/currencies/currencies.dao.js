'use strict'

const currencyModel = require('../../models/currency.model')
const currencyDescriptionModel = require('../../models/currencyDescription.model')
const logModel = require('../../models/log.model')
const errorHelper = require('../../utils/errorHelper')

module.exports.createCurrencyDescription = data => {
	return currencyDescriptionModel.create(data)
}