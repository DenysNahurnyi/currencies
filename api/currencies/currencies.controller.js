'use strict'

const currencyUtils = require(`./currencies.util`)
const currencyDao = require(`./currencies.dao`)
const errorHelper = require(`../../utils/errorHelper`)


module.exports.getCurrenciesRoute = async (req, res, next) => {
	try {
		const currencies = await currencyUtils.getCurrencyDescriptionsOuterService()
		const currenciesArray = currencyUtils.prepareToSaveCurrencyDescriptions(currencies)
		await currencyDao.createCurrencyDescription(currenciesArray)

		const currencValues = await currencyUtils.getCurrencyValuesOuterService()
		

		res.json(currencies)
		// logModel.create({
		// 	event: `Try to save smth in database`,
		// 	date: new Date()
		// })
	} catch(err) {
		console.log(err)
		errorHelper.notFound(err)
		return next(err)
	}
}

module.exports.test = async (req, res, next) => {
	try {
		console.log('1')
		res.json({
			msg: "Hello"
		})
		// logModel.create({
		// 	event: `Try to save smth in database`,
		// 	date: new Date()
		// })
	} catch(err) {
		errorHelper.notFound(err)
		return next(err)
	}
}

module.exports.recreateCurrencyDescriptionsInDb = async isEmpty => {
	try {
		if(!isEmpty) {
			await currencyDao.dropCurrencyDescription()
			console.log(`Description collection droped`)
		}
		const currencies = await currencyUtils.getCurrencyDescriptionsOuterService()
		const currenciesArray = currencyUtils.prepareToSaveCurrencyDescriptions(currencies)
		await currencyDao.createCurrencyDescription(currenciesArray)
	} catch(err) {
		console.log(err)
		throw err
	}
}

// TODO: updateCurrenciesValuesInDb
module.exports.recreateCurrenciesValuesInDb = async isEmpty => {
	try {
		if(!isEmpty) {
			await currencyDao.dropCurrencyValues()
		}
		const currencies = await currencyUtils.getCurrencyValuesOuterService()
		const currenciesArray = currencyUtils.prepareToSaveCurrencyValues(currencies.rates, currencies.base)
		await currencyDao.createCurrencyValue(currenciesArray)
	} catch(err) {
		console.log(err)
		throw err
	}
}


