'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('foto_etiqueta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      foto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'foto',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      etiqueta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'etiqueta',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('foto_etiqueta');
  }
};
