`use strict`

const currencyUtil = require(`./currency.util`)

describe(`Unit test for currency module`, () => {
	describe(`Test for currency util`, () => {
		describe(`Test getCurrencyDescriptionsOuterService`, () => {
			test(`getCurrencyDescriptionsOuterService respond well with internet connection`, async () => {
				let curData = await currencyUtil.getCurrencyDescriptionsOuterService()
				expect(Object.keys(curData).length).toBeGreaterThan(0)
				expect(curData[Object.keys(curData)[0]].length).toBeGreaterThan(0)
			})
		})

		describe(`Test getCurrencyValuesOuterService`, () => {
			test(`getCurrencyValuesOuterService respond well with internet connection`, async () => {
				let curData = await currencyUtil.getCurrencyValuesOuterService()
				expect(Object.keys(curData).length).toBeGreaterThan(0)
				expect(curData.base.length).toBeGreaterThan(0)
				expect(curData.rates[Object.keys(curData.rates)[0]]).toBeGreaterThan(0)
			})
		})

		describe(`Test prepareToSaveCurrencyDescriptions`, () => {
			test(`prepareToSaveCurrencyDescriptions successfully prettify given object`, () => {
				const curData = { ABC: `Test description`}
				const curDataPretty = currencyUtil.prepareToSaveCurrencyDescriptions(curData)
				expect(curDataPretty[0].abbr).toEqual(`ABC`)
				expect(curDataPretty[0].description).toEqual(`Test description`)
			})
			test(`prepareToSaveCurrencyDescriptions process empty input`, () => {
				try {
					const curDataPretty = currencyUtil.prepareToSaveCurrencyDescriptions()
				} catch (err) {
					expect(err.code).toEqual(500)
					expect(err.error).toEqual(`SERVER_ERROR`)
					expect(err.toString()).toEqual(`Error: Can't process outer currency service response about currrency description`)
				}
			})
		})

		describe(`Test prepareToSaveCurrencyDescriptions`, () => {
			test(`prepareToSaveCurrencyValues successfully prettify given object`, () => {
				const curData = {
					"disclaimer": `Usage subject to terms: https://openexchangerates.org/terms`,
					"license": `https://openexchangerates.org/license`,
					"timestamp": 1520161225,
					"base": `USD`,
					"rates": {
						"ABC": 3.673014
					}
				}
				const curDataPretty = currencyUtil.prepareToSaveCurrencyValues(curData.rates, curData.base)
				expect(curDataPretty[0].abbr).toEqual(`ABC`)
				expect(curDataPretty[0].value).toEqual(3.673014)
				expect(curDataPretty[0].base).toEqual(`USD`)
			})
			test(`prepareToSaveCurrencyValues process empty input`, () => {
				try {
					const curDataPretty = currencyUtil.prepareToSaveCurrencyValues()
				} catch (err) {
					expect(err.code).toEqual(500)
					expect(err.error).toEqual(`SERVER_ERROR`)
					expect(err.toString()).toEqual(`Error: Can't process outer currency service response about currrency values`)
				}
			})
		})

		describe(`Test prettifyCurrencyDescription`, () => {
			test(`prettifyCurrencyDescription successfully prettify given array`, () => {
				const currencyData = [{
					abbr: `ABC`,
					description: `Test description`
				}]
				const curDataPretty = currencyUtil.prettifyCurrencyDescription(currencyData)
				expect(curDataPretty[currencyData.abbr]).toEqual(currencyData.description)
			})

			test(`prettifyCurrencyDescription process empty input`, () => {
				try {
					const curDataPretty = currencyUtil.prettifyCurrencyDescription()
				} catch (err) {
					expect(err.code).toEqual(500)
					expect(err.error).toEqual(`SERVER_ERROR`)
					expect(err.toString()).toEqual(`Error: Currency description not found in database`)
				}
			})
		})

		describe(`Test prettifyCurrencyValues`, () => {
			test(`prettifyCurrencyValues successfully prettify given array`, () => {
				const currencyData = [{
					_id: `5a9adead3286fb0c10cbeeec`,
					base: `USD`,
					value: 3.673014,
					abbr: `AED`,
					__v: 0
				}]
				const curDataPretty = currencyUtil.prettifyCurrencyValues(currencyData)
				expect(curDataPretty.rates[currencyData.abbr]).toEqual(currencyData.value)
				expect(curDataPretty.base).toEqual(`USD`)
			})

			test(`prettifyCurrencyDescription process empty input`, () => {
				try {
					const curDataPretty = currencyUtil.prettifyCurrencyValues()
				} catch (err) {
					expect(err.code).toEqual(500)
					expect(err.error).toEqual(`SERVER_ERROR`)
					expect(err.toString()).toEqual(`Error: Currency values not found in database`)
				}
			})
		})

		describe(`Test prettifyCurrencyDetails`, () => {
			test(`prettifyCurrencyDetails successfully prettify given params`, () => {
				const currencyValueData = [{
					_id: `5a9adead3286fb0c10cbeeec`,
					base: `USD`,
					value: 3.673014,
					abbr: `ABC`,
					__v: 0
				}]
				const currencyDescriptionData = [{
					abbr: `ABC`,
					description: `Test description`
				}]
				const curDataPretty = currencyUtil.prettifyCurrencyDetails(currencyValueData, currencyDescriptionData)
				expect(curDataPretty.abbr).toEqual(currencyValueData[0].abbr)
				expect(curDataPretty.base).toEqual(currencyValueData[0].base)
				expect(curDataPretty.value).toEqual(currencyValueData[0].value)
				expect(curDataPretty.description).toEqual(currencyDescriptionData[0].description)
			})

			test(`prettifyCurrencyDescription process empty input`, () => {
				try {
					const curDataPretty = currencyUtil.prettifyCurrencyDetails()
				} catch (err) {
					expect(err.code).toEqual(400)
					expect(err.error).toEqual(`BAD_REQUEST`)
					expect(err.toString()).toEqual(`Error: Currency value not found in database`)
				}
			})

			test(`prettifyCurrencyDescription process empty currencyDescriptionData`, () => {
				try {
					const currencyValueData = [{
						_id: `5a9adead3286fb0c10cbeeec`,
						base: `USD`,
						value: 3.673014,
						abbr: `ABC`,
						__v: 0
					}]
					const curDataPretty = currencyUtil.prettifyCurrencyDetails(currencyValueData)
				} catch (err) {
					expect(err.code).toEqual(400)
					expect(err.error).toEqual(`BAD_REQUEST`)
					expect(err.toString()).toEqual(`Error: Currency description not found in database`)
				}
			})

			test(`prettifyCurrencyDetails process values and description data with different abbr`, () => {
				try {
					const currencyValueData = [{
						_id: `5a9adead3286fb0c10cbeeec`,
						base: `USD`,
						value: 3.673014,
						abbr: `ABC`,
						__v: 0
					}]
					const currencyDescriptionData = [{
						abbr: `ABC`,
						description: `Test description`
					}]
					const curDataPretty = currencyUtil.prettifyCurrencyDetails(currencyValueData, currencyDescriptionData)
				} catch (err) {
					expect(err.code).toEqual(500)
					expect(err.error).toEqual(`SERVER_ERROR`)
					expect(err.toString()).toEqual(`Error: Currency data value and currency description describe different currencies`)
				}
			})
		})

		describe(`Test validateAbbr`, () => {
			test(`validateAbbr successfully prettify given params`, () => {
				const testCurrencyAbbr = `USD`
				const abbrResult = currencyUtil.validateAbbr(testCurrencyAbbr)
				expect(abbrResult).toEqual(testCurrencyAbbr)
			})

			test(`validateAbbr process empty input`, () => {
				try {
					const abbrResult = currencyUtil.validateAbbr()
				} catch (err) {
					expect(err.code).toEqual(400)
					expect(err.error).toEqual(`BAD_REQUEST`)
					expect(err.toString()).toEqual(`Error: Abbreviation is not defined`)
				}
			})

			test(`validateAbbr process lowercase input`, () => {
				try {
					const testCurrencyAbbr = `usd`
					const abbrResult = currencyUtil.validateAbbr(testCurrencyAbbr)
				} catch (err) {
					expect(err.code).toEqual(400)
					expect(err.error).toEqual(`BAD_REQUEST`)
					expect(err.toString()).toEqual(`Error: Abbreviation should be uppercase`)
				}
			})
		})
	})
})