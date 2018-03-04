'use strict'

const chai = require(`chai`)
const chaiHttp = require(`chai-http`)
const mocha = require(`mocha`)

const server = require(`../../`)

chai.should()
chai.use(chaiHttp)

mocha.describe(`Test all external API's`, () => {
	let authToken
	mocha.before((done) => {
		chai.request(server)
			.get(`/api/token`)
			.end((err, res) => {
				void err
				res.should.have.status(200)
				res.body.should.be.an(`object`)
				res.body.should.have.property(`authToken`)
				authToken = res.body.authToken
				done()
			})
	})
	mocha.describe(`GET /api/rates/UAH`, () => {
		mocha.it(`should list hrivnya details /api/rates/MYR GET`, (done) => {
			chai.request(server)
				.get(`/api/rates/MYR`)
				.set(`Authorization`, authToken)
				.end((err, res) => {
					void err
					res.should.have.status(200)
					res.body.should.be.an(`object`)
					res.body.should.have.property(`abbr`)
					res.body.abbr.should.be.equal(`MYR`)
					res.body.should.have.property(`description`)
					res.body.description.should.be.equal(`Malaysian Ringgit`)
					res.body.should.have.property(`description`)
					res.body.should.have.property(`value`)
				})
			done()
		})
		mocha.it(`should reject request because auth token missing /api/rates/UAH GET`, (done) => {
			chai.request(server)
				.get(`/api/rates/UAH`)
				.end((err, res) => {
					void err
					res.should.have.status(200)
					res.body.should.be.an(`object`)
					res.body.should.have.property(`code`)
					res.body.code.should.be.equal(403)
					res.body.should.have.property(`error`)
					res.body.error.should.be.equal(`FORBIDDEN`)
					res.body.should.have.property(`message`)
					res.body.message.should.be.equal(`Please provide authorization token in authorization header.Use localhost:3000/api/token to get authorization token.`)
				})
			done()
		})
	})
	mocha.describe(`GET /api`, () => {
		mocha.it(`should list all currencies and their description /api GET`, (done) => {
			chai.request(server)
				.get(`/api`)
				.set(`Authorization`, authToken)
				.end((err, res) => {
					void err
					res.should.have.status(200)
					res.body.should.be.an(`object`)
					res.body.should.have.property(`UAH`)
				})
			done()
		})
		mocha.it(`should reject request because auth token missing /api GET`, (done) => {
			chai.request(server)
				.get(`/api`)
				.end((err, res) => {
					void err
					res.should.have.status(200)
					res.body.should.be.an(`object`)
					res.body.should.have.property(`code`)
					res.body.code.should.be.equal(403)
					res.body.should.have.property(`error`)
					res.body.error.should.be.equal(`FORBIDDEN`)
					res.body.should.have.property(`message`)
					res.body.message.should.be.equal(`Please provide authorization token in authorization header.Use localhost:3000/api/token to get authorization token.`)
				})
			done()
		})
	})
	mocha.describe(`GET /api/rates`, () => {
		mocha.it(`should list all currencies and their rates /api/rates GET`, (done) => {
			chai.request(server)
				.get(`/api/rates`)
				.set(`Authorization`, authToken)
				.end((err, res) => {
					void err
					res.should.have.status(200)
					res.body.should.be.an(`object`)
					res.body.should.have.property(`rates`)
					res.body.should.have.property(`base`)
				})
			done()
		})
		mocha.it(`should reject request because auth token missing /api/rates GET`, (done) => {
			chai.request(server)
				.get(`/api/rates`)
				.end((err, res) => {
					void err
					res.should.have.status(200)
					res.body.should.be.an(`object`)
					res.body.should.have.property(`code`)
					res.body.code.should.be.equal(403)
					res.body.should.have.property(`error`)
					res.body.error.should.be.equal(`FORBIDDEN`)
					res.body.should.have.property(`message`)
					res.body.message.should.be.equal(`Please provide authorization token in authorization header.Use localhost:3000/api/token to get authorization token.`)
				})
			done()
		})
	})
	mocha.describe(`PUT /api/update`, () => {
		mocha.it(`should update database rates /api/update PUT`, (done) => {
			chai.request(server)
				.put(`/api/update`)
				.set(`Authorization`, authToken)
				.end((err, res) => {
					void err
					res.should.have.status(200)
					res.body.should.be.an(`string`)
					res.body.should.be.equal(`Database updated`)
					done()
				})
			done()
		})
		mocha.it(`should reject request because auth token missing /api/update PUT`, (done) => {
			chai.request(server)
				.put(`/api/update`)
				.end((err, res) => {
					void err
					res.should.have.status(200)
					res.body.should.be.an(`object`)
					res.body.should.have.property(`code`)
					res.body.code.should.be.equal(403)
					res.body.should.have.property(`error`)
					res.body.error.should.be.equal(`FORBIDDEN`)
					res.body.should.have.property(`message`)
					res.body.message.should.be.equal(`Please provide authorization token in authorization header.Use localhost:3000/api/token to get authorization token.`)
					done()
				})
		})
	})
})