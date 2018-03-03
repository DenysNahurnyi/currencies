`use strict`

const currencyModel = require(`../../models/currency.model`)
const currencyDescriptionModel = require(`../../models/currencyDescription.model`)
const logModel = require(`../../models/log.model`)
const eventTypes = require(`../../config/credentials`).eventTypes

module.exports.createCurrencyDescription = data => 
	currencyDescriptionModel.create(data)

module.exports.getCurrencyDescription = (filter = {}) => 
	currencyDescriptionModel.find(filter)

module.exports.createCurrencyValue = data => 
	currencyModel.create(data)

module.exports.getCurrencyValue = (filter = {}) => 
	currencyModel.find(filter)

module.exports.dropCurrencyDescription = async () => {
	await currencyDescriptionModel.remove({})
	await module.exports.logEvent(`Collection with currency descriptions dropped`, `drop`)
}

module.exports.dropCurrencyValues = async () => {
	await currencyModel.remove({})
	await module.exports.logEvent(`Collection with currency values dropped`, `drop`)
}

module.exports.getCurrencyDescriptions = () =>
	currencyDescriptionModel.find({})

module.exports.getCurrencyValues = () =>
	currencyModel.find({})

module.exports.logEvent = (eventMsg, eventType) =>
	logModel.create({
		eventMessage: eventMsg,
		eventType: eventTypes[eventType][1]
	})