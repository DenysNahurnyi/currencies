`use strict`

const request = require(`request-promise`)

const errorHelper = require(`../../utils/errorHelper`)
const appId = require(`../../config/credentials`)[process.env.NODE_ENV].currencyService.appId

module.exports.getCurrencyDescriptionsOuterService = async () => 
	JSON.parse(
		await request(`https://openexchangerates.org/api/currencies.json`)
	)

module.exports.prepareToSaveCurrencyDescriptions = currenciesObject => 
	Object.keys(currenciesObject).map(abbr => ({
		abbr,
		description: currenciesObject[abbr]
	}))


module.exports.getCurrencyValuesOuterService = async () => 
	JSON.parse(
		await request(`https://openexchangerates.org/api/latest.json?app_id=${appId}`)
	)

module.exports.prepareToSaveCurrencyValues = (rates, base) => 
	Object.keys(rates).map(abbr => ({
		base,
		value: rates[abbr],
		abbr
	}))

module.exports.prettifyCurrencyDescription = currencyDescription => {
	let response = {}
	currencyDescription.forEach(currency => {
		response[currency.abbr] = currency.description
	})
	return response
}

module.exports.prettifyCurrencyValues = currencyValues => {
	if (!currencyValues || !currencyValues.length) {
		return errorHelper.serverError(`Currency values not found in database`)
	}
	let response = {
		base: currencyValues[0].base,
		rates: {}
	}

	currencyValues.forEach(currency => {
		response.rates[currency.abbr] = currency.value
	})
	return response
}

module.exports.prettifyCurrencyDetails = (currencyValue, currencyDescription) => {
	if (!currencyValue || !currencyValue.length) {
		return errorHelper.serverError(`Currency value not found in database`)
	}
	if (!currencyDescription || !currencyDescription.length) {
		return errorHelper.serverError(`Currency description not found in database`)
	}
	return {
		abbr: currencyValue[0].abbr,
		value: currencyValue[0].value,
		description: currencyDescription[0].description,
		base: currencyValue[0].base
	}
}