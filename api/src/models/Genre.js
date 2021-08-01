const { DataTypes } = require('sequelize');

/*
[ ] Genero con las siguientes propiedades:
ID
Nombre 
*/

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{timestamps: false});
};