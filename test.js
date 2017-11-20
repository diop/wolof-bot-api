const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('./server.js')

const expect = chai.expect

chai.use(chaiHttp)

describe("it", () => {
  it("responds correctly to no query", () =>
    chai.request(app)
      .get('/')
      .then( res => {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.have.key('message')
        expect(res.body.message).to.equal('You must specify a word in the query string.')
      })
  )

  it("responds correctly if the word is not found", () =>
    chai.request(app)
      .get('/')
      .query({ word: 'magical' })
      .then( res => {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.have.key('message')
        expect(res.body.message).to.equal('Word magical not found.')
      })
  )

  it("responds correctly if the word is found", () =>
    chai.request(app)
      .get('/')
      .query({ word: 'bit' })
      .then( res => {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.have.keys(['word', 'definition'])
        expect(res.body.word).to.have.keys(['en', 'wo'])
        expect(res.body.definition).to.have.keys(['en', 'wo'])
        expect(res.body.word.en).to.equal('bit')
        expect(res.body.word.wo).to.equal('domm')
      })
  )

  it("responds if an image is requested", () =>
    chai.request(app)
      .get('/images/www.png')
      .then( res => {
        expect(res).to.have.status(200)
        expect(res.type).to.equal('image/png')
      })
  )
})
