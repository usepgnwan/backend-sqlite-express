'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('tbl_points',{ 
      id:  {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: true
      }, 
      tbl_wilayah_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tbl_wilayah',  
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     await queryInterface.dropTable('tbl_points');
  }
};
