const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false,
      validate:{
        notEmpty:true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notEmpty:true
      }
    },
    released: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        isNumeric: true,
        max:5
      }
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
      
      // validate:{
      //     isIn: [/*extraer datos de https://api.rawg.io/api/platforms/lists/parents?key=e90a3925844544f39dc82b1a0bc9b811*/]
      //   }
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://avatars.githubusercontent.com/u/57154655?s=200&v=4'
    }
  });

};
