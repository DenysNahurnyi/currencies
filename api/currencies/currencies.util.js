`use strict`

const request = require(`request-promise`)
const config = require(`config`)

const appId = config.get(`currencyService.appId`)

module.exports.getCurrencyDescriptionsOuterService = async () => 
	JSON.parse(
		await request(`https://openexchangerates.org/api/currencies.json`)
	)


module.exports.getCurrencyValuesOuterService = async () => 
	JSON.parse(
		await request(`https://openexchangerates.org/api/latest.json?app_id=${appId}`)
	)