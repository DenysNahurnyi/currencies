module.exports = {
	development: {
		database: `mongodb://localhost:27017/currencies_db`,
		currencyService: {
			appId: `0ff2ccc76bba477baf6541fe2b0a7c3d`
		}
	},
	production: {
		database: `mongodb://n826:trickyadmin@ds155218.mlab.com:55218/currencies_db`,
		currencyService: {
			appId: `0ff2ccc76bba477baf6541fe2b0a7c3d`
		}
	},
	test: {
		database: `mongodb://localhost:27017/currencies_db`,
		currencyService: {
			appId: `0ff2ccc76bba477baf6541fe2b0a7c3d`
		}
	},
	local: {
		database: `mongodb://localhost:27017/currencies_db`,
		currencyService: {
			appId: `0ff2ccc76bba477baf6541fe2b0a7c3d`
		}
	},
	eventTypes: {
		error: [`error`, 1],
		drop: [`drop`, 2],
		update: [`update`, 3],
		create: [`create`, 4],
	}
}