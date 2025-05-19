module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite', // Andmebaasi faili asukoht
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
  },
  production: {
    dialect: 'sqlite',
    storage: './database.sqlite',
  },
  PORT: 3001, 
};
