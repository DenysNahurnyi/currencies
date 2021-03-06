'use strict'

const mongoose = require(`mongoose`)

const Schema = mongoose.Schema

const currency = new Schema({
	base: String,
	value: Number,
	abbr: String
}, {
	collection: `currencies`,
	_id: true
})

module.exports = mongoose.model(`currency`, currency)