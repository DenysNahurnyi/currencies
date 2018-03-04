`use strict`

const request = require(`request-promise`)

const errorHelper = require(`../../utils/errorHelper`)
const appId = require(`../../config/credentials`)[process.env.NODE_ENV || `local`].currencyService.appId

module.exports.getCurrencyDescriptionsOuterService = async () => {
	const resData = await request(`https://openexchangerates.org/api/currencies.json`)
	if(resData && JSON.parse(resData) && Object.keys(JSON.parse(resData)) && Object.keys(JSON.parse(resData)).length) {
		return JSON.parse(resData)
	} else {
		throw errorHelper.serverError(`Outer currency service is not responding`)
	}
}

module.exports.prepareToSaveCurrencyDescriptions = currenciesObject => {
	if(currenciesObject && Object.keys(currenciesObject) && currenciesObject[Object.keys(currenciesObject)[0]].length) {
		return Object.keys(currenciesObject).map(abbr => ({
			abbr,
			description: currenciesObject[abbr]
		}))
	} else {
		throw errorHelper.serverError(`Can't process outer currency service response about currrency description`)
	}
}


module.exports.getCurrencyValuesOuterService = async () => {
	const resData = await request(`https://openexchangerates.org/api/latest.json?app_id=${appId}`)
	if(resData && JSON.parse(resData) && Object.keys(JSON.parse(resData)) && Object.keys(JSON.parse(resData)).length) {
		return JSON.parse(resData)
	} else {
		throw errorHelper.serverError(`Outer currency service is not responding`)
	}
}

module.exports.prepareToSaveCurrencyValues = (rates, base = `USD`) => {
	if(rates && Object.keys(rates) && Number(rates[Object.keys(rates)[0]])) {
		return Object.keys(rates).map(abbr => ({
			base,
			value: rates[abbr],
			abbr
		}))
	} else {
		throw errorHelper.serverError(`Can't process outer currency service response about currrency values`)
	}
}

module.exports.prettifyCurrencyDescription = (currencyDescription = []) => {
	let response = {}
	currencyDescription.forEach(currency => {
		response[currency.abbr] = currency.description
	})
	if(!Object.keys(response).length) {
		throw errorHelper.serverError(`Currency description not found in database`)
	}
	return response
}

module.exports.prettifyCurrencyValues = (currencyValues = []) => {
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
		throw errorHelper.badRequest(`Currency value not found in database`)
	}
	if (!currencyDescription || !currencyDescription.length) {
		throw errorHelper.badRequest(`Currency description not found in database`)
	}
	if (currencyValue[0].abbr !== currencyDescription[0].abbr) {
		throw errorHelper.serverError(`Currency data value and currency description describe different currencies`)
	}
	return {
		abbr: currencyValue[0].abbr,
		value: currencyValue[0].value,
		description: currencyDescription[0].description,
		base: currencyValue[0].base
	}
}

module.exports.validateAbbr = abbr => {
	if(!abbr) {
		throw errorHelper.badRequest(`Abbreviation is not defined`)
	}
	if(abbr != abbr.toUpperCase()) {
		throw errorHelper.badRequest(`Abbreviation should be uppercase`)
	}
	return abbr
}