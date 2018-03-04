'use strict'


const authUtil = require(`../../utils/authToken`)
const errorHelper = require(`../../utils/errorHelper`)

module.exports.getToken = async (req, res, next) => {
	try {
		const responseData = {
			authToken: authUtil.createToken()
		}
		res.json(responseData)
	} catch(err) {
		return next(err)
	}
}