<div align="center">

<img width="220" src="https://cdn-icons-png.flaticon.com/512/4248/4248443.png" />

# 🌐 MicroGateway

### Arquitectura de Microservicios con API Gateway desarrollada en Node.js, Express y PostgreSQL 🚀

<p align="center">
  <b>MicroGateway</b> es una arquitectura basada en microservicios que implementa un API Gateway como punto central de acceso, ofreciendo autenticación mediante JWT, comunicación REST, cache inteligente, rate limiting y separación completa entre servicios para lograr una solución escalable y mantenible.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Microservices-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Express-API%20Gateway-000000?style=for-the-badge&logo=express">
  <img src="https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql&logoColor=white">
  <img src="https://img.shields.io/badge/JWT-Security-orange?style=for-the-badge">
</p>

<p align="center">
  <a href="#-acerca-de-microgateway">Acerca de</a> •
  <a href="#-arquitectura">Arquitectura</a> •
  <a href="#-características">Características</a> •
  <a href="#-tecnologías-utilizadas">Tecnologías</a> •
  <a href="#-instalación">Instalación</a>
</p>

</div>

---

# 🌐 Acerca de MicroGateway

**MicroGateway** es un proyecto académico y profesional diseñado para demostrar cómo implementar una arquitectura moderna basada en **Microservicios** utilizando **Node.js**.

La solución divide el sistema en múltiples servicios independientes que se comunican mediante HTTP REST y son administrados por un **API Gateway**, encargado de centralizar la autenticación, el enrutamiento, la seguridad y la optimización de las peticiones.

La arquitectura implementa:

- 🔐 Autenticación JWT
- 🌐 API Gateway
- ⚡ Cache Inteligente
- 🚦 Rate Limiting
- 🔄 Comunicación REST
- 📦 Microservicios Independientes
- 🗄️ PostgreSQL
- 🔒 Seguridad Centralizada

---

# 🏗 Arquitectura

La solución está compuesta por tres servicios principales.

## 🌐 API Gateway

Es el único punto de entrada del sistema.

Se encarga de:

- Redireccionar peticiones
- Validar tokens JWT
- Aplicar Rate Limiting
- Gestionar Cache
- Centralizar la seguridad
- Ocultar la infraestructura interna

---

## 🔐 API Auth

Microservicio dedicado exclusivamente a la autenticación.

Permite:

- Registro de usuarios
- Inicio de sesión
- Refresh Token
- Logout
- Gestión de JWT
- Blacklist de Tokens

---

## 📝 API Relatos

Servicio independiente encargado de la administración de reportes o relatos.

Incluye:

- CRUD completo
- Protección mediante JWT
- Persistencia en PostgreSQL
- Comunicación mediante REST

---

# 📸 Arquitectura General

```
                 Cliente

                    │
                    ▼

             API Gateway
          (Puerto 3001)

         ┌────────┴─────────┐
         ▼                  ▼

   API Auth            API Relatos
   Puerto 3002          Puerto 3003

         │                  │
         └────────┬─────────┘
                  ▼

             PostgreSQL
```

---

# 🚀 Características

## 🔐 Seguridad

- JWT Access Token
- Refresh Token
- Blacklist de Tokens
- Protección de rutas
- Middleware de autenticación

---

## 🌐 API Gateway

- Proxy HTTP
- Balance lógico
- Enrutamiento
- Seguridad centralizada
- Comunicación transparente

---

## ⚡ Optimización

- Cache con NodeCache
- Respuestas rápidas
- Reducción de carga
- Rate Limiting
- Protección contra abuso

---

## 📦 Arquitectura Modular

Cada microservicio posee:

- Código independiente
- Base lógica separada
- Escalabilidad individual
- Despliegue independiente

---

# 🗄 Base de Datos

El sistema utiliza **PostgreSQL**.

Tablas principales:

- Usuarios
- Relatos
- Blacklist de Tokens

---

## Usuarios

Almacena:

- Nombre
- Email
- Contraseña cifrada

---

## Relatos

Cada registro contiene:

- Fecha
- Descripción
- Latitud
- Longitud
- Tipo
- Usuario

---

## Blacklist

Permite invalidar tokens JWT al cerrar sesión.

---

# 🌐 Endpoints

## Auth

```
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
```

---

## Relatos

```
GET /relatos

GET /relatos/:id

POST /relatos

PUT /relatos/:id

DELETE /relatos/:id
```

Todas las rutas requieren un **Bearer Token** válido.

---

# ⚙ Variables de Entorno

## Gateway

```env
PORT_GATEWAY=3001

API_AUTH_URL=http://localhost:3002

API_RELATOS_URL=http://localhost:3003
```

---

## API Auth

```env
PORT=3002

JWT_SECRET_ACCESS=

JWT_SECRET_REFRESH=

DB_USER=

DB_PASSWORD=

DB_HOST=

DB_NAME=

DB_PORT=
```

---

## API Relatos

```env
PORT=3003

JWT_SECRET_ACCESS=

DB_USER=

DB_PASSWORD=

DB_HOST=

DB_NAME=

DB_PORT=
```

---

# 📂 Arquitectura del Proyecto

```bash
ArquitecturaMicroservicios/

│

├── gateway/
│   ├── middleware/
│   ├── cache/
│   ├── routes/
│   └── index.js
│
├── api-auth/
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   ├── routes/
│   └── database/
│
├── api-relatos/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── database/
│
├── database/
│
└── README.md
```

---

# 🛠 Tecnologías Utilizadas

## Backend

<p>
<img src="https://skillicons.dev/icons?i=nodejs,express" />
</p>

- Node.js
- Express
- REST API
- express-http-proxy

---

## Base de Datos

<p>
<img src="https://skillicons.dev/icons?i=postgresql" />
</p>

- PostgreSQL

---

## Seguridad

<p>
<img src="https://skillicons.dev/icons?i=jwt" />
</p>

- JSON Web Token
- Refresh Token
- Blacklist

---

## Herramientas

<p>
<img src="https://skillicons.dev/icons?i=git,github,postman" />
</p>

- Git
- GitHub
- Postman
- dotenv
- NodeCache
- express-rate-limit

---

# ⚡ Instalación

## 1️⃣ Clonar repositorio

```bash
git clone https://github.com/isairey/MicroGateway
```

---

## 2️⃣ Instalar dependencias

En cada servicio:

```bash
npm install
```

---

## 3️⃣ Crear Base de Datos

```sql
CREATE DATABASE rotasegura;
```

---

## 4️⃣ Configurar variables

Crear los archivos:

```
.env
```

en cada servicio.

---

## 5️⃣ Ejecutar servicios

### Gateway

```bash
cd gateway

npm start
```

---

### API Auth

```bash
cd api-auth

npm start
```

---

### API Relatos

```bash
cd api-relatos

npm start
```

---

# 🧪 Pruebas

El proyecto incluye pruebas mediante:

- Registro de usuarios
- Login
- Refresh Token
- CRUD completo
- Cache
- Rate Limiting

Puede utilizarse:

- Postman
- CURL
- Thunder Client

---

# 🔥 Funcionalidades Técnicas

- API Gateway
- Proxy HTTP
- JWT Authentication
- Cache Inteligente
- Rate Limiting
- REST APIs
- Arquitectura Modular
- Comunicación entre Servicios
- Escalabilidad Horizontal
- Separación de Responsabilidades

---

# 🎯 Objetivos del Proyecto

Este proyecto fue desarrollado para practicar:

- Arquitectura de Microservicios
- API Gateway
- Node.js
- Express
- PostgreSQL
- JWT
- Seguridad
- Sistemas Distribuidos
- Escalabilidad
- Desarrollo Backend Profesional

---

# 🚀 Roadmap

## Próximamente

- 🐳 Docker Compose
- ☸ Kubernetes
- 📊 Prometheus
- 📈 Grafana
- 🔍 Service Discovery
- ⚡ Redis Cache
- 📬 RabbitMQ
- 🔥 CI/CD con GitHub Actions

---

# 👨‍💻 Fundador

<div align="center">

<img width="140" src="https://github.com/isairey.png" />

## Isai Reyes — Backend & Full Stack Developer

Especializado en arquitecturas distribuidas, microservicios, APIs REST, sistemas empresariales y desarrollo backend moderno.

</div>

---

# 🌟 Apoya el Proyecto

Si te gusta **MicroGateway**:

⭐ Dale una estrella al repositorio

🍴 Haz Fork del proyecto

📢 Compártelo con otros desarrolladores

---

# 📜 Licencia

Proyecto desarrollado con fines educativos y de investigación sobre arquitecturas de microservicios utilizando Node.js y Express.

---

<div align="center">

### 🌐 MicroGateway — Arquitecturas modernas para aplicaciones escalables.

</div>
