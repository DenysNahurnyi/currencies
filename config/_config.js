'use strict'
const env = process.env.NODE_ENV || `local`
const config = {
	test: {
		database: `mongodb://localhost:27017/currencies_db`,
	},
	local: {
		database: `mongodb://localhost:27017/currencies_db`,
	},
	development: {
		database: `mongodb://localhost:27017/currencies_db`,
	},
	production: {
		database: `mongodb://n826:trickyadmin@ds155218.mlab.com:55218/currencies_db`,
	}
}

module.exports = config[env]