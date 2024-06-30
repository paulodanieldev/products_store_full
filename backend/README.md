# Projeto PHP com Docker

Este projeto é um exemplo de aplicação PHP utilizando Docker para facilitar a configuração do ambiente de desenvolvimento.

## Pré-requisitos

Antes de começar, você precisará ter o Docker e o Docker Compose instalados na sua máquina. Você pode baixar e instalar através dos seguintes links:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuração do Ambiente

1. Clone este repositório para a sua máquina local:

    ```bash
    git clone https://github.com/paulodanieldev/products_store_full
    cd products_store_full
    ```

2. Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias. Um exemplo de `.env` pode ser encontrado abaixo:

    ```plaintext
    # .env

    # Configurações do Banco de Dados
    DB_HOST=seu_ip_local
    DB_CONNECTION=pgsql
    DB_PORT=5432
    DB_DATABASE=db_softexpert_products
    DB_USERNAME=seu_user
    DB_PASSWORD=seu_pass

    # Outras configurações
    # - a porta onde vai rodar com docker
    APP_PORT=8000
    ```

## Build e Execução com Docker

3. Execute o comando abaixo para construir e iniciar os containers Docker:

    ```bash
    docker-compose up --build -d
    ```

    Este comando irá construir os containers definidos no arquivo `docker-compose.yml` e iniciá-los em segundo plano (`-d`).

4. Após o comando ser executado com sucesso, a aplicação estará rodando e acessível no navegador através do endereço `http://localhost:8000`.


