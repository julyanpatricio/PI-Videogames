/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai')
const session = require('supertest-session')
const app = require('../../src/app.js')
const { Videogame, conn } = require('../../src/db.js')
const isUUID = require('is-uuid')
const { v4: uuidv4 } = require('uuid')

const agent = session(app)
const videogame = {
  id: uuidv4(),
  name: 'Henry Game',
  description: 'Descripcion del juego',
  platforms: ['PC', 'Android']
}

describe('Videogames routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err)
    }))
  beforeEach(() => Videogame.sync({ force: true })
    .then(async () => (await Videogame.create(videogame))))

  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').then(res => expect(200))
    )
    it('responds with a array', () =>
      agent.get('/videogames').then((res) => {
        expect(res.body).to.be.an('array')
      }))
    it('responds with a array with length 100', () =>
      agent.get('/videogames').then((res) => {
        expect(res.body).to.be.an('array').with.lengthOf(100)
      }))
    it('responds with a array of objects', () =>
      agent.get('/videogames').then((res) => {
        expect(res.body[0]).to.be.an('object')
      }))
    it('the object of array contain the name property ', () =>
      agent.get('/videogames').then((res) => {
        expect(res.body[0]).to.have.property('name')
      }))
    it('the object of array contain the image property ', () =>
      agent.get('/videogames').then((res) => {
        expect(res.body[0]).to.have.property('image')
      }))
    it('the object of array contain the genres property ', () =>
      agent.get('/videogames').then((res) => {
        expect(res.body[0]).to.have.property('genres')
      }))
    it('the object of array contain the platforms property ', () =>
      agent.get('/videogames').then((res) => {
        expect(res.body[0]).to.have.property('platforms')
      }))
    it('the property id is not a number', () =>
      agent.get('/videogames').then((res) => {
        expect(res.body[0].id).to.be.not.a('number')
      }))
  })


  describe('Videogame/:id route contain a detail of the game', () => {

    describe('GET /videogame/:id', () => {
      it('should get 200', () =>
        agent.get('/videogame/1').then(res => expect(200))
      )
      it('responds with a object', () =>
        agent.get('/videogame/1').then((res) => {
          expect(res.body).to.be.an('object')
        }))
      it('the object contain the name property ', () =>
        agent.get('/videogame/1').then((res) => {
          expect(res.body).to.have.property('name')
        }))
      it('the object contain the image property ', () =>
        agent.get('/videogame/1').then((res) => {
          expect(res.body).to.have.property('image')
        }))
      it('the object contain the genres property ', () =>
        agent.get('/videogame/1').then((res) => {
          expect(res.body).to.have.property('genres')
        }))
      it('the object contain the platforms property ', () =>
        agent.get('/videogame/1').then((res) => {
          expect(res.body).to.have.property('platforms')
        }))
      it('the object contain the description property ', () =>
        agent.get('/videogame/1').then((res) => {
          expect(res.body).to.have.property('description')
        }))
      it('the object contain the rating property ', () =>
        agent.get('/videogame/1').then((res) => {
          expect(res.body).to.have.property('rating')
        }))
      it('the object contain the released property ', () =>
        agent.get('/videogame/1').then((res) => {
          expect(res.body).to.have.property('released')
        }))
    })
  })

  // describe('POST /videogame', () => {
  //   it('responds with 200', () => agent.post('/videogame').then((res) => expect(200)))
  // })

})
