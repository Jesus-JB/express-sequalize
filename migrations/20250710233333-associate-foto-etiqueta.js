'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('fotoetiquetas', {
      fields: ['foto_id'],
      type: 'foreign key',
      name: 'fk__foto_id',
      references: {
        table: 'fotos',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'set null'
    });

    await queryInterface.addConstraint('fotoetiquetas', {
      fields: ['etiqueta_id'],
      type: 'foreign key',
      name: 'fk__etiqueta_id',
      references: {
        table: 'etiquetas',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'set null'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('fotoetiquetas', 'fk__foto_id');
    await queryInterface.removeConstraint('fotoetiquetas', 'fk__etiqueta_id');
  }
};
