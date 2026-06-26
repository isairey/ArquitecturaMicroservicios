# Arquitetura de Microsserviços com API Gateway (Node.js + Express)

Este projeto demonstra uma arquitetura de microsserviços utilizando:

- API Gateway (Express + express-http-proxy)

- API de Autenticação (api-auth)

- API de Relatos (api-relatos)

- Tokens JWT

- Banco PostgreSQL

- Comunicação via REST/HTTP

- Isolamento entre serviços

- Cache e Rate Limiting (pontos extras do trabalho)

- Cada serviço rodando em sua própria porta

# Arquitetura Geral

Diagrama completo no Excalidraw:

[Diagrama](https://excalidraw.com/#json=umbor9S0JeIjT-2CAPSMa,lZ0i7iot6lzYM82XPPWJIw)

# Portas utilizadas
| Serviço | Porta | 
|---------------|-------| 
| Gateway | 3001 | 
| API Auth | 3002 | 
| API Relatos | 3003 |

# Como rodar cada serviço
## 1 - Gateway
`cd gateway`

`npm install`

`npm start`

## 2 - API Auth
`cd api-auth`

`npm install`

`npm start`

## 3 - API Relatos
`cd api-relatos`

`npm install`

`npm start`

# Variáveis de ambiente (.env)
## Gateway (.env)
PORT_GATEWAY=3001

API_AUTH_URL=http://localhost:3002

API_RELATOS_URL=http://localhost:3003

# API Auth (.env)
PORT=3002

JWT_SECRET_ACCESS=chave_acesso

JWT_SECRET_REFRESH=chave_refresh

DB_USER=seu_user

DB_PASSWORD=sua_senha

DB_HOST=localhost

DB_NAME=rotasegura

DB_PORT=5432

# API Relatos (.env)
PORT=3003

JWT_SECRET_ACCESS=chave_acesso

DB_USER=seu_user

DB_PASSWORD=sua_senha

DB_HOST=localhost

DB_NAME=rotasegura

DB_PORT=5432

# Banco de Dados Local (PostgreSQL)

Crie o banco:

`CREATE DATABASE rotasegura;`


Crie as tabelas:

`CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(200) NOT NULL
);`

`CREATE TABLE token_blacklist (
    id SERIAL PRIMARY KEY,
    token TEXT NOT NULL,
    expira_em TIMESTAMP NOT NULL
);`

`CREATE TABLE relatos (
    id SERIAL PRIMARY KEY,                                                                               
    datahora TIMESTAMP NOT NULL,
    descricao TEXT,
    latitude NUMERIC(10,6),
    longitude NUMERIC(10,6),
    origem VARCHAR(50),
    tipo VARCHAR(50),
    usuarioemail VARCHAR(100)
);`

# Rotas expostas pelo Gateway
## /auth/*
POST /auth/registrar

POST /auth/login

POST /auth/refresh

POST /auth/logout

## /relatos/*
GET    /relatos

GET    /relatos/:id

POST   /relatos

PUT    /relatos/:id

DELETE /relatos/:id

*Todas as rotas de /relatos exigem Bearer Token válido.*

# Testes via CURL
## Registrar usuário
curl -X POST http://localhost:3001/auth/registrar \

  -H "Content-Type: application/json" \
  
  -d '{"nome":"User","email":"user@gmail.com","senha":"12345678"}'
  
## Login
curl -X POST http://localhost:3001/auth/login \

  -H "Content-Type: application/json" \
  
  -d '{"email":"teste1@gmail.com","senha":"12345678"}'

## Refresh token
curl -X POST http://localhost:3001/auth/refresh \

  -H "Content-Type: application/json" \
  
  -d '{"refreshToken":"SEU_REFRESH_TOKEN"}'
  
## Listar relatos
curl http://localhost:3001/relatos \

  -H "Authorization: Bearer SEU_ACCESS"

## Buscar relato por ID
curl http://localhost:3001/relatos/1 \

  -H "Authorization: Bearer SEU_ACCESS"

## Criar relato
curl -X POST http://localhost:3001/relatos \

  -H "Authorization: Bearer SEU_TOKEN" \
  
  -H "Content-Type: application/json" \
  
  -d '{"dataHora":"2025-11-12 10:00:00","descricao":"Teste","latitude":1,"longitude":1,"origem":"app","tipo":"roubo","usuarioEmail":"teste@gmail.com"}'

## Atualizar relato
curl -X PUT http://localhost:3001/relatos/ID_DO_RELATO \

  -H "Authorization: Bearer SEU_ACCESS" \
  
  -H "Content-Type: application/json" \
  
  -d '{"id": ID_DO_RELATO, "descricao":"Novo texto", "tipo":"furto"}'

## Remover relato
curl -X DELETE http://localhost:3001/relatos/ID_DO_RELATO \

  -H "Authorization: Bearer SEU_ACCESS"

## Logout
curl -X POST http://localhost:3001/auth/logout \

  -H "Authorization: Bearer SEU_ACCESS" \
  
  -H "Content-Type: application/json" \
  
  -d '{"accessToken":"SEU_ACCESS","refreshToken":"SEU_REFRESH"}'

# Testes de Cache
1 - Primeira requisição

`curl http://localhost:3001/relatos -H "Authorization: Bearer SEU_TOKEN"`

2 - Segunda requisição

`curl http://localhost:3001/relatos -H "Authorization: Bearer SEU_TOKEN"`

Log esperado no terminal em que está rodando a API do Gateway:
[CACHE] /relatos

# Teste de Rate-Limit
for i in {1..200}; do curl -s http://localhost:3001/relatos; echo; done

Resposta esperada:

{"error":"Muitas requisições. Tente novamente mais tarde."}

# Justificativa da Arquitetura
Cada microserviço é isolado e pode escalar independentemente.

O Gateway abstrai as URLs internas e centraliza preocupações transversais:
- autenticação
- segurança
- cache
- rate limiting
- roteamento

api-auth lida exclusivamente com autenticação e tokens JWT.

api-relatos lida apenas com CRUD dos relatos.

Facilita deploy independente, manutenção e escalabilidade.

# Sobre o Cache no Gateway

O cache foi implementado utilizando NodeCache e o recurso oficial userResDecorator do express-http-proxy.
Esse método é necessário porque o proxy não usa res.json() e a resposta não passa pelos middlewares tradicionais do Express.

Por isso, userResDecorator é o único ponto onde é possível capturar a resposta do microserviço, salvar no cache e retornar ao cliente.

Cache é aplicado apenas em GET, garantindo consistência.

# Tecnologias utilizadas
- Node.js
- Express
- express-http-proxy
- PostgreSQL
- JWT
- dotenv
- NodeCache
- express-rate-limit
