const express = require("express");
const proxy = require("express-http-proxy");
const rateLimit = require("express-rate-limit");
const NodeCache = require("node-cache");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT_GATEWAY;
const AUTH_URL = process.env.API_AUTH_URL;
const RELATOS_URL = process.env.API_RELATOS_URL;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo por IP
    message: { error: "Muitas requisições. Tente novamente mais tarde." }
});

app.use(limiter);

const cache = new NodeCache({ stdTTL: 100 }); // cache de 100 segundos

function proxyWithCache(req, res, next) {
    const key = req.originalUrl;
    const cached = cache.get(key);

    if (cached) {
        console.log("[CACHE]", key);
        return res.json(cached);
    }
    return proxy(RELATOS_URL, {
        proxyReqPathResolver: req => `/relatos${req.path}`,

        // intercepta resposta do backend
        userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
            try {
                const data = JSON.parse(proxyResData.toString("utf8"));
                cache.set(key, data);
                return data;
            } catch (err) {
                console.log("Erro ao parsear JSON do proxy:", err);
                return proxyResData;
            }
        }

    })(req, res, next);
}

app.use(
    "/auth",
    proxy(AUTH_URL, {
        proxyReqPathResolver: (req) => `/auth${req.path}`,
    })
);

app.use(
    "/relatos",
    (req, res, next) => {
        if (req.method === "GET") return proxyWithCache(req, res, next);
        next();
    },
    proxy(RELATOS_URL, {
        proxyReqPathResolver: (req) => `/relatos${req.path}`,
    })
);

app.listen(PORT, () =>
    console.log(`Gateway rodando na porta ${PORT}`)
);