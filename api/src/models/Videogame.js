const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

/*
[ ] Videojuego con las siguientes propiedades:
ID: * No puede ser un ID de un videojuego ya existente en la API rawg
Nombre *
Descripción *
Fecha de lanzamiento
Rating
Plataformas *
*/

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
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.STRING,
      // type: DataTypes.DATEONLY //Si llego con el tiempo, desplegar en el form un 'calendario' para ingresar una fecha y luego formatearlo con el formato de DATEONLY antes de guardarlo en la base de datos
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        max:5
      }
    },
    platforms: {
      type: DataTypes.STRING,
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
