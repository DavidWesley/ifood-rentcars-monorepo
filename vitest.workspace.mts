import { defineWorkspace } from "vitest/config"
export default defineWorkspace([
    // biome disable
    "apps/*/vitest.config.{e2e,integration,unit}.ts",
])
