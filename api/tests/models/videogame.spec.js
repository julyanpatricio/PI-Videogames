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
          .catch(() => console.log('not created'))
      })
      .catch(() => console.log('not sync')
      ))

    describe('name', () => {
      it('should throw an error if name is null or empty', (done) => {
        Videogame.create({...createVideogame, id: uuidv4(), name:''})
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
            done(new Error('It requires a new name'))
          )
      })
    })

    describe('description', () => {
      it('should throw an error if description is null', (done) => {
        Videogame.create({...createVideogame, id: uuidv4(), name: uuidv4(), description:null})
          .then(() => done(new Error('It requires a valid description')))
          .catch(() => done());
      });
      it('should throw an error if description is empty', (done) => {
        Videogame.create({ ...createVideogame, id: uuidv4(), name: uuidv4(), description:''})
          .then(() => done(new Error('It requires a valid description')))
          .catch(() => done());
      });
      it('should work when its a valid description', (done) => {
        Videogame.create({ ...createVideogame, id: uuidv4(),name: uuidv4(), description: 'the best game' })
          .then(() => {
            done()
          })
          .catch((e) => {
          console.log(e)
            done(new Error('It requires a valid description'))}
          )
      })
    })

    describe('rating', () => {
      it('should throw an error if rating is not a number', (done) => {
        Videogame.create({...createVideogame, id: uuidv4(), name: uuidv4(), rating:'great'})
          .then(() => done(new Error('It requires a numerical rating')))
          .catch(() => done());
      });
      it('should throw an error if rating is greater than 5', (done) => {
        Videogame.create({ ...createVideogame, id: uuidv4(), name: uuidv4(), rating:99})
          .then(() => done(new Error('It requires a valid numerical rating')))
          .catch(() => done());
      });
      it('should work when its a valid numerical rating', (done) => {
        Videogame.create({ ...createVideogame, id: uuidv4(),name: uuidv4(), rating: 4 })
          .then(() => {
            done()
          })
          .catch((e) => {
          console.log(e)
            done(new Error('It requires a valid description'))}
          )
      })
    })

    describe('platforms', () => {
      it('should throw an error if platforms is null', (done) => {
        Videogame.create({...createVideogame, id: uuidv4(), name: uuidv4(), platforms:null})
          .then(() => done(new Error('It requires an array with platforms')))
          .catch(() => done());
      });
      it('should throw an error if platforms is not an array', (done) => {
        Videogame.create({...createVideogame, id: uuidv4(), name: uuidv4(), platforms:'PC'})
          .then(() => done(new Error('It requires an array with platforms')))
          .catch(() => done());
      });
      it('should work when its valid platforms', (done) => {
        Videogame.create({ ...createVideogame, id: uuidv4(),name: uuidv4(), platforms:['PC','Android'] })
          .then(() => {
            done()
          })
          .catch((e) => {
          console.log(e)
            done(new Error('It requires valid platforms'))}
          )
      })
    })


  })

  
})
