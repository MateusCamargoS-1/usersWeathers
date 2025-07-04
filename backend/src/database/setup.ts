import db from './db';

const setupDataBase = async () => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id CHAR(36) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE
    )
  `);

  console.log('Tabela "users" criada.');
};

export default setupDataBase;
