/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai')
const session = require('supertest-session')
const app = require('../../src/app.js')
const { Videogame, conn } = require('../../src/db.js')
const isUUID = require('is-uuid')
const { v4: uuidv4 } = require('uuid')

const agent = session(app)
const createVideogame = {
  id: uuidv4(),
  name: 'Henry Game',
  description: 'Descripcion del juego',
  platforms: ['PC', 'Android'],
  genres:[1],
  released:'2021-01-01',
  rating:5
}

describe('Videogames routes', () => {
  let getVideogames, getVideogameId, postVideogame, getVideogameIdCreated, getVideogamesByName
  before(() => conn.authenticate()
    .then(async () => {
      console.log('autenticado')
      await Videogame.sync({ force: true })
      console.log('sincronizado')
      await Videogame.create(createVideogame)
      getVideogames = await agent.get('/videogames')
      getVideogamesByName = await agent.get('/videogames?name=mario')
      getVideogameId = await agent.get('/videogame/99')
      getVideogameIdCreated = await agent.get('/videogame/1')
      postVideogame = await agent.post('/videogame').send(createVideogame)
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err)
    }))


  describe('GET /videogames', () => {
    it('should get 200', () => {
      expect(getVideogames.status).to.equal(200)
    })
    it('responds with a array', () => {
      expect(getVideogames.body).to.be.an('array');
    })
    it('responds with a array with length 100', () => {
      expect(getVideogames.body).to.be.an('array').with.lengthOf(100)
    })
    it('responds with a array of objects', () => {
      expect(getVideogames.body[0]).to.be.an('object')
    })
    it('the object of array contain the name property ', () => {
      expect(getVideogames.body[0]).to.have.property('name')
    })
    it('the object of array contain the image property ', () => {
      expect(getVideogames.body[0]).to.have.property('image')
    })
    it('the object of array contain the genres property ', () => {
      expect(getVideogames.body[0]).to.have.property('genres')
    })
    it('the object of array contain the platforms property ', () => {
      expect(getVideogames.body[0]).to.have.property('platforms')
    })
    it('the property id of a created videogame is not a number', () => {
      expect(getVideogames.body[0].id).to.be.not.a('number')
    })
    it('the property id of a original videogame is a number', () => {
      expect(getVideogames.body[99].id).to.be.a('number')
    })
  })


  describe('Videogame/:id route contain a detail of the game', () => {

    describe('GET /videogame/:id', () => {
      it('should get 200', () =>
        expect(getVideogameId.status).to.equal(200)
      )
      it('responds with a object', () => {
          expect(getVideogameId.body).to.be.an('object')
        })
      it('the object contain the name property ', () => {
          expect(getVideogameId.body).to.have.property('name')
        })
      it('the object contain the image property ', () => {
          expect(getVideogameId.body).to.have.property('image')
        })
      it('the object contain the genres property ', () => {
          expect(getVideogameId.body).to.have.property('genres')
        })
      it('the object contain the platforms property ', () => {
          expect(getVideogameId.body).to.have.property('platforms')
        })
      it('the object contain the description property ', () => {
          expect(getVideogameId.body).to.have.property('description')
        })
      it('the object contain the rating property ', () => {
          expect(getVideogameId.body).to.have.property('rating')
        })
      it('the object contain the released property ', () => {
          expect(getVideogameId.body).to.have.property('released')
        })
    })
  })

  describe('POST /videogame', () => {
    it('If the name already exists, you must return an object with an error message', async () => {
      let created = await agent.post('/videogame').send({... createVideogame, id:uuidv4()})
      expect(created.body).to.have.property('error')
    })
    it('if a name is not provided, you must return an object with an error message', async () => {
      let created = await agent.post('/videogame').send({... createVideogame, name:null, id:uuidv4()})
      expect(created.body).to.have.property('error')
    })
    it('if a description is not provided, you must return an object with an error message', async () => {
      let created = await agent.post('/videogame').send({... createVideogame, description:null, name:'NEW henry game', id:uuidv4()})
      expect(created.body).to.have.property('error')
    })
    it('if a platforms is not provided, you must return an object with an error message', async () => {
      let created = await agent.post('/videogame').send({... createVideogame, platforms:null, name:'NEW henry game', id:uuidv4()})
      expect(created.body).to.have.property('error')
    })
    it('responds with status 200 if all data is valid', () => {
      expect(postVideogame.status).to.equal(200)
    })

  })

})