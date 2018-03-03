'use strict'

const mongoose = require(`mongoose`)

const Schema = mongoose.Schema

const log = new Schema({
	eventMessage: String,
	date: { type: Date, default: Date.now },
	eventType: Number
}, {
	collection: `logs`,
	_id: true
})

module.exports = mongoose.model(`log`, log)