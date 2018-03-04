module.exports = {
	development: {
		database: `mongodb://localhost:27017/currencies_db`,
		currencyService: {
			appId: `0ff2ccc76bba477baf6541fe2b0a7c3d`
		},
		tokenSecret: `development token supersecret`,
		BASE_URL: `localhost:3000`
	},
	production: {
		database: `mongodb://n826:trickyadmin@ds155218.mlab.com:55218/currencies_db`,
		currencyService: {
			appId: `0ff2ccc76bba477baf6541fe2b0a7c3d`
		},
		tokenSecret: `production token supersecret`,
		BASE_URL: `https://currencies-serv.herokuapp.com`
	},
	test: {
		database: `mongodb://localhost:27017/currencies_db`,
		currencyService: {
			appId: `0ff2ccc76bba477baf6541fe2b0a7c3d`
		},
		tokenSecret: `test token supersecret`,
		BASE_URL: `localhost:3000`
	},
	local: {
		database: `mongodb://localhost:27017/currencies_db`,
		currencyService: {
			appId: `0ff2ccc76bba477baf6541fe2b0a7c3d`
		},
		tokenSecret: `local token supersecret`,
		BASE_URL: `localhost:3000`
	},
	eventTypes: {
		error: [`error`, 1],
		drop: [`drop`, 2],
		update: [`update`, 3],
		create: [`create`, 4],
	}
}