import tsconfigPaths from "vite-tsconfig-paths"
import { configDefaults, defineConfig } from "vitest/config"

export default defineConfig({
    plugins: [tsconfigPaths()],
    cacheDir: "node_modules/.vite",
    test: {
        reporters: ["default"],
        passWithNoTests: false,
        exclude: [...configDefaults.exclude],
        coverage: {
            all: false,
            provider: "v8",
            exclude: configDefaults.coverage.exclude!,
            reporter: ["text", "html-spa"],
            reportsDirectory: "./tests/coverage",
        },
    },
})
