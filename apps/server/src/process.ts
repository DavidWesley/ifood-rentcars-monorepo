import { Server } from "node:http"
import process, { exit } from "node:process"

const gracefullyShutdown = (server: Server) => (signal: NodeJS.Signals) => {
    console.info("\nRecebido sinal %s. Encerrando...", signal)

    server.close(() => {
        console.log("Servidor encerrado.")
        console.log("Processo finalizado.")
        exit(0)
    })
}

export function configureGracefulShutdown(server: Server) {
    const shutdown = gracefullyShutdown(server)

    process.on("SIGINT", shutdown)
    process.on("SIGTERM", shutdown)
}
