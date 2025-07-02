import{ importCSV } from "../services/importCSV";

const startImport = async () => {
  try {
    const filePath = "./data/usuarios.csv";
    const start = Date.now();

    console.log("Iniciando importação...");

    await importCSV();

    const duration = (Date.now() - start) / 1000;
    console.log(`Importação concluída em ${duration.toFixed(2)} segundos.`);
  } catch (error) {
    console.error("Erro ao importar:", error);
  }
};

startImport();
