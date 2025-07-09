'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const fotos = [];
    for (let i = 1; i <= 10; i++) {
      fotos.push({
        titulo: `foto${i}.jpg`,
        descripcion: `Descripción de la foto ${i}`,
        calificacion: parseFloat((Math.random()*4+1).toFixed(2)),
        ruta: 'public/images/' + 'fotos'+i + '.png',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('fotos', fotos, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fotos', null, {});
  }
};