'use strict'
const env = process.env.NODE_ENV || 'local'
const config = {
	test: {
		database: 'mongodb://localhost:27017/techmagic-hr-dev',
	},
	local: {
		database: 'mongodb://localhost:27017/techmagic-hr-dev',
	},
	development: {
		database: 'mongodb://localhost:27017/techmagic-hr-dev',
	},
	production: {
		database: 'mongodb://localhost:27017/techmagic-hr-dev',
	}
}

module.exports = config[env]