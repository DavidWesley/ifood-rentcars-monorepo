import path from "node:path"
import { configDefaults, defineProject } from "vitest/config"
import { builtinEnvironments } from "vitest/environments"

export default defineProject({
    test: {
        name: "server-units",
        environment: builtinEnvironments.node.name,
        exclude: [...configDefaults.watchExclude],
        root: import.meta.dirname,
        dir: path.resolve(import.meta.dirname, "test"),
        isolate: false,
        include: [`${import.meta.dirname}/test/units/**/*.{test,spec}.{ts,mts,cts}`],
        testTimeout: 1 * 60 * 1000, // 1 minute
        fileParallelism: true,
        globals: false,
        clearMocks: true,
        bail: 4,
        hideSkippedTests: false,
        logHeapUsage: true,
        retry: 0,
    },
})
