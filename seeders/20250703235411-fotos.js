'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (let i = 0; i < 10; i++) {
      await queryInterface.bulkInsert('fotos', [{
        titulo: 'fotos' + i,
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        calificacion: (Math.random() * 10).toFixed(2),
        ruta: 'images/' + 'fotos' + i + '.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
