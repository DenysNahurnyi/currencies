'use strict'

var express = require(`express`)
var router = express.Router()
const logModel = require(`../models/log.model`)

/* GET users listing. */
router.get(`/`, function(req, res, next) {
	logModel.create({
		event: `Try to save smth in database`,
		date: new Date()
	})
	res.send(`respond with a resource`)
})

module.exports = router
