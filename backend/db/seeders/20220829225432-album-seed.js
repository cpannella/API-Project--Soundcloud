'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName ="Albums"
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(options, [
    {
    userId:1,
    title: 'Dark Side of The Moon',
    description: 'The best album ever',
    imageUrl: 'Light going through Prism'
    },
    {
      userId:2,
      title: "10,000 Days",
      description: 'The best progressive metal album ever',
      imageUrl: 'Alex Gray art'
    },
    {
      userId:3,
      title: "Joe's Garage",
      description: 'We were jammin in Joe"s Garage',
      imageUrl: 'Frank Zappa with a fierce mustache'
    },


  ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Albums"
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, null, {})
  }
};
