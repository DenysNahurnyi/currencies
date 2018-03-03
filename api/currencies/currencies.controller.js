'use strict'

const currencyUtils = require(`./currencies.util`)
const currencyDao = require(`./currencies.dao`)


module.exports.getCurrenciesRoute = async (req, res, next) => {

	const currencies = await currencyUtils.getCurrencyDescriptionsOuterService()
	const currenciesArray = currencyUtils.prepareToSaveCurrencyDescriptions(currencies)
	await currencyDao.createCurrencyDescription(currenciesArray)

	const currencValues = await currencyUtils.getCurrencyValuesOuterService()
	

	res.json(currencies)
	// logModel.create({
	// 	event: `Try to save smth in database`,
	// 	date: new Date()
	// })
}

module.exports.recreateCurrencyDescriptionsInDb = async isEmpty => {
	if(!isEmpty) {
		await currencyDao.dropCurrencyDescription()
		console.log(`Description collection droped`)
	}
	const currencies = await currencyUtils.getCurrencyDescriptionsOuterService()
	const currenciesArray = currencyUtils.prepareToSaveCurrencyDescriptions(currencies)
	await currencyDao.createCurrencyDescription(currenciesArray)
}

// TODO: updateCurrenciesValuesInDb
module.exports.recreateCurrenciesValuesInDb = async isEmpty => {
	if(!isEmpty) {
		await currencyDao.dropCurrencyValues()
	}
	const currencies = await currencyUtils.getCurrencyValuesOuterService()
	const currenciesArray = currencyUtils.prepareToSaveCurrencyValues(currencies.rates, currencies.base)
	console.log(`Value: ${currenciesArray[0].base}`)
	await currencyDao.createCurrencyValue(currenciesArray)
}


