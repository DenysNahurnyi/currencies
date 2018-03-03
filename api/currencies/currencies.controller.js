'use strict'

const currencyUtils = require(`./currencies.util`)
const currencyDao = require(`./currencies.dao`)


module.exports.getCurrenciesRoute = async (req, res, next) => {
	try {
		console.log('1')
		const currencies = await currencyUtils.getCurrencyDescriptionsOuterService()
		console.log('2')
		const currenciesArray = currencyUtils.prepareToSaveCurrencyDescriptions(currencies)
		console.log('3')
		await currencyDao.createCurrencyDescription(currenciesArray)
		console.log('4')

		const currencValues = await currencyUtils.getCurrencyValuesOuterService()
		console.log('5')
		

		res.json(currencies)
		// logModel.create({
		// 	event: `Try to save smth in database`,
		// 	date: new Date()
		// })
	} catch(err) {
		console.log(err)
		return next(err)
	}
}

module.exports.test = async (req, res, next) => {
	try {
		res.json({
			msg: "Hello"
		})
		// logModel.create({
		// 	event: `Try to save smth in database`,
		// 	date: new Date()
		// })
	} catch(err) {
		console.log(err)
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


