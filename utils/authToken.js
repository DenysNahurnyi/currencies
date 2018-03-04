`use strict`

const jwt = require(`jsonwebtoken`)

const errorHelper = require(`../utils/errorHelper`)
const tokenSecret = require(`../config/credentials`)[process.env.NODE_ENV || `local`].tokenSecret
const BASE_URL = require(`../config/credentials`)[process.env.NODE_ENV || `local`].BASE_URL

module.exports.createToken = (expTimeMinutes = 60) => {
	expTimeMinutes = Number(expTimeMinutes)
	if(!expTimeMinutes || expTimeMinutes <= 0) {
		throw errorHelper.serverError(`Period of experation for authorization token expiration is not valid`)
	} else if(expTimeMinutes > 10080) {
		throw errorHelper.serverError(`Period of experation for authorization token can't be longer than one week(10080)`)
	} else {
		return jwt.sign({
			data: `Username in future`,
			exp: Math.floor(Date.now() / 1000) + (60 * expTimeMinutes)
		}, tokenSecret)
	}
}

module.exports.verifyToken = token => 
	jwt.verify(token, tokenSecret)

module.exports.verifyTokenMiddleware = (req, res, next) => {
	try {
		const token = module.exports.verifyToken(req.headers.authorization)
		req.userData = token.data
		next()
	} catch (err) {
		return next(errorHelper.forbidden(`Please provide authorization token in authorization header.Use ${BASE_URL}/api/token to get authorization token.`))
	}
}