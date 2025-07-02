# API de Usuários e Clima

API RESTful construída com Node.js, Express e MySQL para gerenciar usuários e consultar dados climáticos de cidades utilizando uma API externa. A aplicação conta com cache, validação de dados, documentação Swagger e testes automatizados.

---

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- MySQL (mysql2)
- dotenv
- Swagger (swagger-jsdoc, swagger-ui-express)
- Axios
- Node-cache
- Express-validator
- Jest e Supertest (para testes)
- ts-node-dev (para desenvolvimento)

---

## Pré-requisitos

- Node.js (recomendado >= 18)
- MySQL
- pnpm (ou npm/yarn)

---

## Instalação

1. Clone o repositório:

  ```bash
  git clone https://github.com/MateusCamargoS-1/userWeathers.git
  cd backend
  ```
2. Instale as dependências:

 ```bash
  pnpm install
  # ou npm install
  # ou yarn install
  ```
## Banco de Dados:
Este projeto utiliza MySQL para armazenamento dos dados. No ambiente de desenvolvimento, estou utilizando o **XAMPP** para gerenciar o servidor MySQL/MariaDB, com interface via **phpMyAdmin** para facilitar o gerenciamento.
- Tipo de servidor: MariaDB (versão 10.4.32)
- Usuário padrão: root@localhost
- Charset: UTF-8 Unicode (utf8mb4)

> **Nota:** Essas informações servem para conhecimento e configuração local. Você pode usar qualquer outro servidor MySQL compatível, apenas ajuste as variáveis de ambiente `.env` para conectar ao seu banco.

---



  Crie um arquivo .env na raiz do projeto com as seguintes variáveis (ajuste conforme seu ambiente):

  ```env
  DB_HOST=localhost
  DB_PORT=3306
  DB_USER=usuario_do_banco
  DB_PASSWORD=
  DB_NAME=nome_do_banco
  WEATHER_API_KEY=SUA_CHAVE_DA_API
  PORT=3001
  WEATHER_API_KEY: Você deve obter uma chave válida em WeatherAPI.
  ```

## Scripts disponíveis
 - Comando	Descrição
    - pnpm dev -	Inicia o servidor em modo desenvolvimento
    - pnpm test -	Executa os testes com cobertura
    - pnpm importar -	Importa dados do arquivo CSV para o banco

## Executando a aplicação
1. Inicie o servidor:

  ```bash
  pnpm dev
  ```
2. Acesse a documentação Swagger em:
  ```bash
  http://localhost:3001/api-docs
  ```
3. As rotas principais são:

  - /users - para CRUD de usuários

  - /weather/:city -  para consulta do clima da cidade (exemplo: /weather/Porto Alegre)

## Importação de dados CSV
  Para importar dados do CSV (data/users.csv) para a tabela users no banco, execute:
 ```bash
  pnpm importar
  ```
## Testes automatizados
  Execute os testes com:
  ```bash
  pnpm test
  ```
  Os testes cobrem as rotas de usuários e clima.

## Estrutura do projeto
  ```bash
  src/
    config/           # Configurações (Swagger)
    controllers/      # Lógica dos endpoints
    database/         # Conexão e setup do banco
    middleware/       # Middlewares (validação)
    models/           # Tipagens e interfaces
    routes/           # Definição das rotas
    scripts/          # Scripts de importação
    services/         # Serviços auxiliares (ex: importação CSV)
    testes/           # Testes automatizados
    server.ts         # Arquivo principal do servidor
  .env                # Variáveis de ambiente
  package.json        # Configuração do projeto
  ```

## Observações
  - O banco é inicializado automaticamente com a tabela users caso ela não exista.
  - A API de clima utiliza cache para melhorar desempenho nas requisições repetidas.
  - Use um client HTTP como Postman ou Insomnia para testar as rotas facilmente.
  - A API retorna erros padronizados para facilitar o tratamento no frontend.
