'use strict'

const currencyUtils = require(`./currency.util`)
const currencyDao = require(`./currency.dao`)
const errorHelper = require(`../../utils/errorHelper`)

module.exports.getCurrencyDescriptionRoute = async (req, res, next) => {
	try {
		const currencyDescriptionResponse = await currencyDao.getCurrencyDescription()
		const responseData = currencyUtils.prettifyCurrencyDescription(currencyDescriptionResponse)
		res.json(responseData)
	} catch(err) {
		return next(err)
	}
}

module.exports.getCurrencyValuesRoute = async (req, res, next) => {
	try {
		const currencyValueResponse = await currencyDao.getCurrencyValue()
		const responseData = currencyUtils.prettifyCurrencyValues(currencyValueResponse)
		res.json(responseData)

	} catch(err) {
		return next(err)
	}
}

module.exports.getCurrencyDetailsRoute = async (req, res, next) => {
	try {
		const requestData = {
			abbr: currencyUtils.validateAbbr(req.params.abbr)
		}
		const currencyValueResponse = await currencyDao.getCurrencyValue({abbr: requestData.abbr})
		const currencyDescriptionResponse = await currencyDao.getCurrencyDescription({abbr: requestData.abbr})
		const responseData = currencyUtils.prettifyCurrencyDetails(currencyValueResponse, currencyDescriptionResponse)
		res.json(responseData)

	} catch(err) {
		return next(err)
	}
}

module.exports.updateCurrencyDataRoute = async (req, res, next) => {
	try {
		module.exports.recreateCurrencyDescriptionsInDb()
		const currencyValuesResponse = await currencyUtils.getCurrencyValuesOuterService()

		await Object.keys(currencyValuesResponse.rates).map(async abbr => {
			const filter = {abbr}
			const data = {
				base: currencyValuesResponse.base,
				value: currencyValuesResponse.rates[abbr],
				abbr
			}
			await currencyDao.updateCurrencyValue(filter, data)
		})
		await currencyDao.logEvent(`Collection with currency values updated`, `update`)
		res.status(200).end(`Database updated`)

	} catch(err) {
		return next(err)
	}
}

module.exports.recreateCurrencyDescriptionsInDb = async (isEmpty = false) => {
	try {
		if(!isEmpty) {
			await currencyDao.dropCurrencyDescription()
		}
		const currencies = await currencyUtils.getCurrencyDescriptionsOuterService()
		const currenciesArray = currencyUtils.prepareToSaveCurrencyDescriptions(currencies)
		await currencyDao.createCurrencyDescription(currenciesArray)
		await currencyDao.logEvent(`Collection with currency descriptions created`, `create`)
	} catch(err) {
		await currencyDao.logError(String(err))
		throw err
	}
}

module.exports.recreateCurrencyValuesInDb = async isEmpty => {
	try {
		if(!isEmpty) {
			await currencyDao.dropCurrencyValues()
		}
		const currencies = await currencyUtils.getCurrencyValuesOuterService()
		const currenciesArray = currencyUtils.prepareToSaveCurrencyValues(currencies.rates, currencies.base)
		await currencyDao.createCurrencyValue(currenciesArray)
		await currencyDao.logEvent(`Collection with currency values created`, `create`)
	} catch(err) {
		await currencyDao.logError(String(err))
		throw err
	}
}