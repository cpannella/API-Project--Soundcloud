'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Songs"
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(options,
   [
    {
      userId: 1,
      albumId: 1,
      title: 'Time',
      description: 'A song about Time',
      url: 'audio url',
      imageUrl: 'picture of clock'
    },
    {
      userId: 1,
      albumId: 1,
      title: 'Money',
      description: 'A song about money',
      url: 'audio url',
      imageUrl: 'picture of money'
    },
    {
      userId: 1,
      albumId: 1,
      title: 'Any Color You Like',
      description: 'A song about colors',
      url: 'audio url',
      imageUrl: 'a picture of colors'
    },
    {
      userId: 2,
      albumId: 2,
      title: 'The Pot',
      description: 'A song about cooking',
      url: 'audio url',
      imageUrl: 'a picture of a kitchen'
    },
    {
      userId: 2,
      albumId: 2,
      title: 'Jambi',
      description: 'A song about jambing?',
      url: 'audio url',
      imageUrl: 'a picture of a jambi'
    }
    ]
  )
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Songs"
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, null, {} )
  }
};
