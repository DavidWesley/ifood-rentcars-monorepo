// TODO: Eventualmente utilizar `zod` para validar as variáveis de ambiente da aplicação
const ENV = {
    NODE_ENV: process.env["NODE_ENV"] || "development",
    PORT: Number.parseInt(String(process.env["PORT"]), 10) || 3333,
    HOST: process.env["HOST"] || "localhost",
}

export { ENV }
