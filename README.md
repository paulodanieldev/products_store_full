# Projeto Softexpert Products

## video explicativo
https://www.loom.com/share/e707a33f26254b2784c9defddb77ce36?sid=023a2f42-99cb-44d4-923a-a056ad2c3a9b

## Backend

### Pré-requisitos

- **Instalar o Make**  
  Certifique-se de ter o make instalado em sua máquina. No Linux, você pode instalar com o comando:  
  `sudo apt-get install build-essential`

- **Configurar o arquivo .env**  
  Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis:

  - APP_PORT: Porta onde o Docker vai rodar  
    `APP_PORT=8000`

  - Credenciais do banco de dados: Defina as credenciais para o banco de dados  
    `DB_HOST=db`  
    `DB_PORT=5432`  
    `DB_NAME=meu_banco`  
    `DB_USER=meu_usuario`  
    `DB_PASSWORD=minha_senha`

### Passos para rodar o projeto

- **Build do projeto**  
  Execute o comando abaixo para construir o projeto:  
  `make build`

- **Acessar o terminal da VM do Docker**  
  Para acessar o terminal da VM do Docker, execute:  
  `make bash`

- **Instalar dependências com Composer**  
  Dentro do terminal da VM do Docker, execute:  
  `composer install`

- **Restaurar o banco de dados**  
  Execute o comando abaixo para restaurar o banco de dados:  
  `make restore`

- **Parar o Docker**  
  Para parar o Docker, execute:  
  `make down`

- **Iniciar o Docker**  
  Para iniciar o Docker, execute:  
  `make up`

### Testes com Postman

Para realizar testes na API, você pode utilizar o arquivo `softexpert_products.postman_collection.json` que está na raiz do projeto. Importe esse arquivo no Postman para facilitar os testes das rotas da API.

## Frontend

O frontend foi desenvolvido utilizando Next.js.

### Passos para rodar o projeto

- **Instalar as dependências**  
  Na raiz do projeto frontend, execute:  
  `npm install`

- **Configurar o arquivo .env**  
  Crie um arquivo `.env.local` na raiz do projeto frontend e defina a URL da API:  
  `NEXT_PUBLIC_API_URL=http://localhost:8000`

- **Rodar o projeto**  
  Para rodar em modo de desenvolvimento:  
  `npm run dev`

  Para rodar em modo de produção:  
  `npm run build`  
  `npm start`

### Observações

Certifique-se de que todas as variáveis de ambiente estão corretamente configuradas antes de iniciar o projeto. Para qualquer dúvida ou problema, consulte a documentação oficial das tecnologias utilizadas ou entre em contato com o desenvolvedor responsável.