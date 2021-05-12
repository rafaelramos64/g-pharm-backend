'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      sale_price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      sale_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      pharmacy_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pharmacies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      canceled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      vendor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'vendors',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('sales')
  }
}
