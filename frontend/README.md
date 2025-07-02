# Frontend - Aplicação React

## Visão Geral

Este projeto é o frontend de uma aplicação web desenvolvida em React com TypeScript. Ele oferece funcionalidades para gerenciamento de usuários (CRUD), consulta de dados climáticos de cidades brasileiras com integração de mapas via Leaflet, além de uma navegação intuitiva entre páginas. O design é responsivo e utiliza componentes estilizados com Tailwind CSS e UI customizados.

---

## Tecnologias Utilizadas

- **React 18** com TypeScript
- **React Router v6** para navegação SPA
- **Axios** para requisições HTTP
- **React Query (@tanstack/react-query)** para cache e controle de dados assíncronos
- **Tailwind CSS** para estilização rápida e responsiva
- **Lucide-React** para ícones modernos
- **Leaflet + React-Leaflet** para mapas interativos
- **Recharts** para gráficos de linha e visualização de dados climáticos
- **Componentes customizados** com estrutura modular (Cards, Inputs, Buttons, Toaster, Select, etc)
- **Toasts** para feedbacks usando hooks customizados
- Ambiente configurado via Vite (com variáveis ambiente via import.meta.env)

---

## Funcionalidades Principais

### Gerenciamento de Usuários

- Listagem paginada e buscável por nome e email
- Cadastro de novo usuário com validação dos campos
- Visualização de detalhes do usuário
- Atualização e exclusão de usuários (integração backend)
- Feedback visual e mensagens de erro/sucesso via Toasts

### Consulta de Dados Climáticos

- Seleção de cidades brasileiras via dropdown
- Exibição de dados meteorológicos atuais (temperatura, umidade, vento, visibilidade)
- Exibição de alertas meteorológicos, quando existirem
- Gráfico de variação de temperatura por hora (Recharts)
- Mapa interativo com localização da cidade (Leaflet)
- Feedback visual com placeholders durante carregamento

### Navegação e Layout

- Navbar com links para as páginas principais
- Layout responsivo e moderno
- Página 404 personalizada para rotas não encontradas

---

## Estrutura do Projeto
```
src/
├── components/
│ ├── Layout.tsx                  # Layout geral com navbar e estrutura
│ ├── ResponsivePagination.tsx    # Componente de paginação responsiva
│ ├── ui/                         # Componentes UI reutilizáveis (Button, Card, Input, Label, Select, Toaster)
│ └── FlyToCity.tsx               # Componente para movimentar mapa Leaflet
├── hooks/
│ └── use-toast.ts                # Hook customizado para Toasts
├── pages/
│ ├── Index.tsx                   # Página inicial
│ ├── Users.tsx                   # Lista de usuários
│ ├── UserForm.tsx                # Formulário para criação/edição de usuário
│ ├── UserDetails.tsx             # Detalhes do usuário
│ ├── Weather.tsx                 # Página para consulta de dados climáticos
│ └── NotFound.tsx                # Página 404
├── services/
│ ├── api.ts                      # Configuração Axios base
│ ├── userServices.ts             # Serviços API para usuários
│ └── weatherService.ts           # Serviço API para clima
├── App.tsx                       # Componente raiz da aplicação
├── main.tsx                      # Ponto de entrada React
└── index.css                     # Estilos globais Tailwind
```


---

## Como Rodar o Projeto Localmente

### Pré-requisitos

- Node.js (versão recomendada >=16)
- pnpm instalado
- Backend da API rodando e acessível (variável `VITE_API_URL` configurada)

### Passos

1. Clone este repositório:
   ```bash
   git clone https://github.com/MateusCamargoS-1/usersWeather.git
   cd usersWeather
   ```

2. Instale as dependências:

  ```bash
  pnpm install
  ```
3. Configure a variável de ambiente no arquivo .env na raiz do projeto:

  ```bash
  VITE_API_URL=http://localhost:3001/api
  Ajuste a URL para onde seu backend está rodando.
  ```

4. Rode o servidor de desenvolvimento:
  ```bash
  pnpm run dev
  ```

5. Abra no navegador:
  ```arduino
  http://localhost:5173
  ```  

### Observações
  - O projeto utiliza React Query para gerenciar cache e sincronização dos dados da API, melhorando performance.
  - Leaflet está configurado com ícones customizados para evitar erros comuns.
  - Formulários possuem validação e feedback visual para garantir boa UX.
  - O código está organizado em módulos e componentes reutilizáveis.
  - O projeto está preparado para ser estendido e integrado facilmente a APIs RESTful.

