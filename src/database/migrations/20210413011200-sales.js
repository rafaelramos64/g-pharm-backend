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
      id_sale: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
        references: {
          model: 'medicines',
          key: 'id'
        }
      },
      id_vendor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
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
