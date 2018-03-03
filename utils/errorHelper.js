'use strict'

class AppError extends Error {
	constructor (type, message) {
		if (message instanceof AppError) return message
		super(message)
		this.error = type
		delete this.stack
	}
}

module.exports.serverError = (err = ``) => {
	const error = new AppError(`SERVER_ERROR`, err)
	error.code = 500
	return error
}

module.exports.notFound = (err = ``) => {
	const error = new AppError(`NOT_FOUND`, err)
	error.code = 404
	return error
}

module.exports.badRequest = (err = ``) => {
	const error = new AppError(`BAD_REQUEST`, err)
	error.code = 400
	return error
}

module.exports.forbidden = (err = ``) => {
	const error = new AppError(`FORBIDDEN`, err)
	error.code = 403
	return error
}