'use strict'
const logModel = require(`../../models/log.model`)
const currencyUtils = require(`./currencies.util`)


module.exports.getCurrencies = async (req, res, next) => {

	const currencies = await currencyUtils.getCurrencyDescriptionsOuterService()
	const currencValues = await currencyUtils.getCurrencyValuesOuterService()
	

	res.json(currencValues)
	// logModel.create({
	// 	event: `Try to save smth in database`,
	// 	date: new Date()
	// })
}