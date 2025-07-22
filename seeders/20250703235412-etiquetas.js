'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const etiquetas = ['rojo', 'azul', 'techo', 'cielo', 'foco', 'luz'];

    const data = etiquetas.map(texto => ({
      texto,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('etiqueta', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('etiqueta',null, {});
  }
}; 