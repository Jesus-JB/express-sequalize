'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const [fotos] = await queryInterface.sequelize.query(`SELECT id FROM foto ORDER BY id`);
    const [etiquetas] = await queryInterface.sequelize.query(`SELECT id FROM etiqueta ORDER BY id`);

    const relaciones = [];

    for (let i = 0; i < fotos.length; i++) {
      const foto = fotos[i];

      // Obtener dos etiquetas usando índice rotatorio
      const etiqueta1 = etiquetas[i % etiquetas.length];
      const etiqueta2 = etiquetas[(i + 1) % etiquetas.length];

      // Evitar etiquetas repetidas si solo hay una en total
      if (etiqueta1) {
        relaciones.push({
          foto_id: foto.id,
          etiqueta_id: etiqueta1.id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      if (etiqueta2 && etiqueta2.id !== etiqueta1.id) {
        relaciones.push({
          foto_id: foto.id,
          etiqueta_id: etiqueta2.id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    await queryInterface.bulkInsert('foto_etiqueta', relaciones, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('foto_etiqueta', null, {});
  }
};
