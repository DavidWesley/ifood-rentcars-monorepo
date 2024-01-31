import { ENV } from "@/env.ts"
import { server } from "@/server.ts"

server.listen(ENV.PORT, ENV.HOST, () => {
    console.log(`Server is running on port ${ENV.PORT}`)
})
