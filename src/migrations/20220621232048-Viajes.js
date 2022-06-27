'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Viajes',
        'Pasajeros',
         Sequelize.ARRAY(Sequelize.INTEGER)
       )
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Viajes',
      'Pasajeros'
    );
  }
};