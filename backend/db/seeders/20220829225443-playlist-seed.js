'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Playlists',[
      {
        userId: 1,
        name: 'Pink Floyd Favs',
        imageUrl: 'Pink Floyd art'
      },
      {
        userId: 2,
        name: 'Metal playlist',
        imageUrl: 'a piece of metal'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Playlists', null, {})
  }
};
