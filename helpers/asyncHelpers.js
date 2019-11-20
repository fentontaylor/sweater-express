const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

async function findUser(apiKey) {
  try {
    let user = await database('users').where('api_key', apiKey);
    return user;
  } catch (e) {
    return e;
  }
}

async function findFavorite(user, location) {
  try {
    let favorite = await database('favorites')
      .where({ user_id: user[0].id, location: location })
    return favorite;
  } catch (e) {
    return e;
  }
}

async function createFavorite(user, location) {
  try {
    let newFavorite = await database('favorites')
      .insert({ user_id: user[0].id, location: location })
    return newFavorite;
  } catch (e) {
    return e;
  }
}

module.exports = {
  findUser: findUser,
  findFavorite: findFavorite,
  createFavorite: createFavorite
}