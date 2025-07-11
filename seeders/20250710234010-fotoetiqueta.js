'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    let [fotos, fotos_metadata] = await queryInterface.sequelize.query(
      'SELECT id FROM fotos'
    );
    let [etiquetas, etiquetas_metadata] = await queryInterface.sequelize.query(
      'SELECT id, texto FROM etiquetas'
    );

    await queryInterface.bulkInsert('fotoetiquetas', [
      { foto_id: fotos[0].id, etiqueta_id: etiquetas[0].id, createdAt: new Date(), updatedAt: new Date() },
      { foto_id: fotos[0].id, etiqueta_id: etiquetas[1].id, createdAt: new Date(), updatedAt: new Date() },
      { foto_id: fotos[1].id, etiqueta_id: etiquetas[1].id, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fotoetiquetas', null, {});
  }
};
