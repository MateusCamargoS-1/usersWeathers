import connectDB from "../database/db";
import fs from "fs";
import path from "path";

export const importCSV = async () => {
  console.log("Iniciando importação...");

  const connection = await connectDB();

  const csvFilePath = path.resolve(__dirname, "../../data/users.csv");

  try {
    await connection.query({
      sql: `
        LOAD DATA LOCAL INFILE ?
        INTO TABLE users
        FIELDS TERMINATED BY ','
        ENCLOSED BY '"'
        LINES TERMINATED BY '\n'
        IGNORE 1 LINES
        (id, name, email)
      `,
      infileStreamFactory: () => fs.createReadStream(csvFilePath),
      values: [csvFilePath],
    });

    console.log("Importação concluída com sucesso!");
  } catch (error) {
    console.error("Erro ao importar CSV:", error);
  } finally {
    await connection.end();
  }
};
