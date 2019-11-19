
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(() => knex('users').del())
    .then(() => {
      return Promise.all([
        knex('users').insert({
          username: 'BobDobalina', api_key: 'jgn983hy48thw9begh98h4539h4'
        }, 'id')
        .then(user => {
          return knex('favorites').insert({
            user_id: user[0], location: 'Denver, CO'
          })
        })
        .then(() => console.log('Seeding Complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
