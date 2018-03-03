`use strict`

const currenciesDao = require(`../api/currencies/currencies.dao`)
const currenciesController = require(`../api/currencies/currencies.controller`)

module.exports.prepareServer = async dropOption => {
	try {
		const data = await checkIfCollectionsSet()
		if(dropOption.values || !data.isValuesSet) {
			await currenciesController.recreateCurrencyValuesInDb(false)
		}
		if(dropOption.description || !data.isDescriptionSet) {
			await currenciesController.recreateCurrencyDescriptionsInDb(false)
		}
		console.log(`Server is prepared to work!`)
	} catch(err) {
		console.log(err)
		throw err
	}
}

const checkIfCollectionsSet = async () => {
	const curDesc = await currenciesDao.getCurrencyDescriptions()
	const curVal = await currenciesDao.getCurrencyValues()
	return {
		isValuesSet: curVal && curVal.length,
		isDescriptionSet: curDesc && curDesc.length
	}
}