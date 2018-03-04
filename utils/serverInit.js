`use strict`

const currenciesDao = require(`../api/currency/currency.dao`)
const currenciesController = require(`../api/currency/currency.controller`)

module.exports.prepareServer = async dropOption => {
	try {
		const data = await checkIfCollectionsSet()
		if(dropOption.values || !data.isValuesSet) {
			await currenciesController.recreateCurrencyValuesInDb(false)
		}
		if(dropOption.description || !data.isDescriptionSet) {
			await currenciesController.recreateCurrencyDescriptionsInDb()
		}
		console.log(`Server is prepared to work!`)
	} catch(err) {
		console.log(err)
		throw err
	}
}

const checkIfCollectionsSet = async () => {
	const curDesc = await currenciesDao.getCurrencyDescription()
	const curVal = await currenciesDao.getCurrencyValue()
	return {
		isValuesSet: curVal && curVal.length,
		isDescriptionSet: curDesc && curDesc.length
	}
}