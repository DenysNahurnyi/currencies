'use strict'

const mongoose = require(`mongoose`)

const Schema = mongoose.Schema

const currencyDescription = new Schema({
	abbr: String,
	description: Number
}, {
	collection: `currency_description`,
	_id: true
})

module.exports = mongoose.model(`currencyDescription`, currencyDescription)