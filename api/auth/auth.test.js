`use strict`
const jwt = require(`jsonwebtoken`)

const authUtil = require(`../../utils/authToken`)
const tokenSecret = require(`../../config/credentials`)[process.env.NODE_ENV || `local`].tokenSecret


describe(`Unit test for auth module`, () => {
	describe(`Test for auth token util`, () => {
		describe(`Test create token`, () => {
			test(`Successful create token with correct param`, () => {
				const expTimeMinutes = 60
				const token = authUtil.createToken(expTimeMinutes)
				const tokenData = jwt.verify(token, tokenSecret)
				expect(tokenData.exp).not.toBeUndefined()
				expect(tokenData.exp).toBeGreaterThanOrEqual(Math.floor(Date.now() / 1000) + (expTimeMinutes))
				expect(tokenData.data).not.toBeUndefined()
				expect(tokenData.data.length).toBeGreaterThanOrEqual(1)
			})

			test(`Successful create token with empty param`, () => {
				const expTimeMinutes = 60
				const token = authUtil.createToken()
				const tokenData = jwt.verify(token, tokenSecret)
				expect(tokenData.exp).not.toBeUndefined()
				expect(tokenData.exp).toBeGreaterThanOrEqual(Math.floor(Date.now() / 1000) + (expTimeMinutes))
				expect(tokenData.data).not.toBeUndefined()
				expect(tokenData.data.length).toBeGreaterThanOrEqual(1)
			})

			test(`Fail create token with incorrect param`, () => {
				try {
					const expTimeMinutes = -1
					authUtil.createToken(expTimeMinutes)
				} catch (err) {
					expect(err.toString()).toEqual(`Error: Period of experation for authorization token expiration is not valid`)
					expect(err.error).toEqual(`SERVER_ERROR`)
				}
			})

			test(`Fail create token with too long time period of expiration`, () => {
				try {
					const expTimeMinutes = 999999999
					authUtil.createToken(expTimeMinutes)
				} catch (err) {
					expect(err.toString()).toEqual(`Error: Period of experation for authorization token can't be longer than one week(10080)`)
					expect(err.error).toEqual(`SERVER_ERROR`)
				}
			})
		})

		describe(`Test create token`, () => {
			test(`Successful verify token with correct param`, () => {
				const token = authUtil.createToken()
				const tokenData = authUtil.verifyToken(token)
				expect(tokenData.exp).not.toBeUndefined()
				expect(tokenData.data).not.toBeUndefined()
				expect(tokenData.data.length).toBeGreaterThan(1)
				expect(tokenData.iat).not.toBeUndefined()
			})

			test(`Get error when verify empty param`, () => {
				try {
					const tokenData = authUtil.verifyToken()
				} catch (err) {	
					expect(err).not.toBeUndefined()
					expect(err.message).toEqual(`jwt must be provided`)
					expect(err.name).toEqual(`JsonWebTokenError`)
				}
			})

			test(`Verify expired token`, async () => {
				const waitALIttle = () =>
					new Promise((resolve, reject) => {
						setTimeout(() => {resolve()}, 1000)
					})
				try {
					const token = authUtil.createToken(0.00000001)
					await waitALIttle()
					const tokenData = authUtil.verifyToken(token)
				} catch (err) {
					expect(err).not.toBeUndefined()
					expect(err.message).toEqual(`jwt expired`)
					expect(err.name).toEqual(`TokenExpiredError`)
				}
			})
		})
	})
})