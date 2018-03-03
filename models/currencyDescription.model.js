'use strict'

const mongoose = require(`mongoose`)

const Schema = mongoose.Schema

const currencyDescription = new Schema({
	abbr: String,
	description: String
}, {
	collection: `currency_description`,
	_id: true
})

module.exports = mongoose.model(`currencyDescription`, currencyDescription)