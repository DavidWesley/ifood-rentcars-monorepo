# Rentcars

Monorepo de uma aplicação responsável por gerenciar aluguéis de veículos desenvolvido durante o *BootCamp* do iFood em parceria com a [Ada](https://ada.tech/).
 
## Como executar

```bash
docker compose -f docker-compose.yml --env-file .env.dev up --build -d
```

## O que está incluído?

Este repositório utiliza o [npm](https://www.npmjs.com/) como gerenciador de pacotes.
Ele inclui os seguintes pacotes/aplicações:

### Aplicações e Pacotes

- *`@repo/web`: Em breve...*
- `@repo/server`: um servidor [Express](https://expressjs.com/)
- `@repo/drizzle`: Wrapper do ORM Drizzle para gerenciar e acessar o banco de dados
- `@repo/env`: Um pequeno gerenciador central de variáveis de ambiente, usado para validá-las e expô-las em todo o monorepo
- `@repo/tsconfig`: Arquivos tsconfig.json utilizados em todo o monorepo

### Docker

Este repositório está configurado para ser construído com Docker e Docker Compose.

#### Para construir todas as aplicações neste repositório:

```bash
# Construir e iniciar em modo desanexado
docker compose -f docker-compose.yml --env-file .env.dev up --build --d
```
É muito importante que o arquivo `.env.dev` seja informado conforme apresentado no exemplo acima para que o comando execute sem falhas.

#### Para acessar as aplicações instanciadas

- Abra [**http://localhost:3000**](http://localhost:3000) para acessar o aplicação web. (Em breve)
- Abra [**http://localhost:3001**](http://localhost:3001) para acessar o servidor.

####  Para encerrar todos os containers em execução:

```bash
# Parar todos os containers em execução
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```