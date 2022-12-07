'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName ="Playlists"
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert(options,[
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
    options.tableName = "Playlists"
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, null, {})
  }
};
