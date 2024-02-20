import { configureGracefulShutdown } from "@/process.ts"
import { server } from "@/server.ts"
import { ENV } from "@repo/env"

server.listen(ENV.server.PORT, ENV.server.HOST, () => {
    console.log(`Server is running on port ${ENV.server.PORT}`)
})

configureGracefulShutdown(server)
