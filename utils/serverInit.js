`use strict`

const currenciesDao = require(`../api/currencies/currencies.dao`)
const currenciesController = require(`../api/currencies/currencies.controller`)

module.exports.prepareServer = async dropOption => {
	const data = await checkIfCollectionsSet()
	if(dropOption.values || !data.isValuesSet) {
		await currenciesController.recreateCurrenciesValuesInDb(false)
	}
	if(dropOption.description || !data.isDescriptionSet) {
		await currenciesController.recreateCurrencyDescriptionsInDb(false)
	}
	console.log(`Server is prepared to work!`)
}

const checkIfCollectionsSet = async () => {
	const curDesc = await currenciesDao.getCurrencyDescriptions()
	const curVal = await currenciesDao.getCurrencyValues()
	return {
		isValuesSet: curVal && curVal.length,
		isDescriptionSet: curDesc && curDesc.length
	}
}