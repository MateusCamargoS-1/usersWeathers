import connectDB from "./db";

const setupDataBase = async () => {
  const connection = await connectDB();

  await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
      id CHAR(36) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE
    )`);

    console.log('Tabela "users" criada.');
    await connection.end();
};

export default setupDataBase;