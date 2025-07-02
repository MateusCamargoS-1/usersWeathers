# Projeto Users & Weather

Este repositório contém a aplicação completa **Users & Weather**, composta por:

- **Backend:** API RESTful em Node.js + TypeScript para gerenciamento de usuários e consulta de dados climáticos.
- **Frontend:** Aplicação React + TypeScript para interface de usuário, consumindo a API e exibindo dados com mapas, gráficos e recursos interativos.

---

## Sobre o projeto

O sistema permite:

- Criar, listar, atualizar e deletar usuários.
- Consultar informações climáticas de cidades brasileiras via integração com uma API externa.
- Visualizar dados meteorológicos atuais, gráficos de temperatura e mapas interativos.
- Utilizar cache para otimizar consultas e melhorar performance.
- Testes automatizados garantem qualidade e estabilidade.
- Documentação automática via Swagger para facilitar uso e extensão da API.

A API retorna erros padronizados para facilitar o tratamento e exibição das mensagens no frontend.

---

## Organização do repositório

O repositório está dividido em duas pastas principais:

- `/backend` — contém todo o código, configuração e scripts da API.
- `/frontend` — contém o código da aplicação React.

---

## Como começar

Cada parte do projeto possui seu próprio README com instruções detalhadas de instalação, configuração e execução.

- Para informações e passos do **backend**, acesse: [`/backend/README.md`](./backend/README.md)
- Para informações e passos do **frontend**, acesse: [`/frontend/README.md`](./frontend/README.md)

---

## Requisitos gerais

- Node.js (versão recomendada >= 16)
- Gerenciador de pacotes pnpm (ou npm/yarn)
- MySQL (usado no backend; localmente pode ser via XAMPP com phpMyAdmin)

---
