const { DataTypes } = require('sequelize');

/*
[ ] Genero con las siguientes propiedades:
ID
Nombre 
*/

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};