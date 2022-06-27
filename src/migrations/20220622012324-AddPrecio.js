'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Viajes',
        'Precio',
         Sequelize.INTEGER
       )
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Viajes',
      'Precio'
    );
  }
};
