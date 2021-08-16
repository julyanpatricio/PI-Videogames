const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');
const { v4: uuidv4 } = require('uuid')

const createVideogame = {
  id: uuidv4(),
  name: 'Henry Game',
  description: 'Descripcion del juego',
  platforms: ['PC', 'Android'],
  genres: [1],
  released: '2021-01-01',
  rating: 5
}

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true })
      .then(() => {
        Videogame.create(createVideogame)
          .catch(() => console.log('no creado'))
      })
      .catch(() => console.log('no sincronizado')
      ))

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if name already exist', (done) => {
        Videogame.create({ ...createVideogame, id: uuidv4(), name: 'Henry Game' })
          .then(() => done(new Error('It requires a inexist name')))
          .catch(() => done());
      });
      it('should work when its a valid name', (done) => {
        Videogame.create({ ...createVideogame, id: uuidv4(), name: 'NEW Henry Game' })
          .then(() => {
            done()
          })
          .catch((e) => 
            done(new Error('It requires a valid name'))
          )
      })
    })
  })
})
