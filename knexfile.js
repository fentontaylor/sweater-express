// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/sweater_express_dev',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/sweater_express_test',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: 'postgres://jcinzmefsvamnt:4ddd31a16279c422317c17f2e59773579b15295cda481e028644086a0dcdc765@ec2-174-129-253-42.compute-1.amazonaws.com:5432/d3t99k37ldlhld',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
