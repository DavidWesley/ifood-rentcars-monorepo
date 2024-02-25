import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src", "!test"],
  splitting: false,
  sourcemap: true,
  clean: true,
  skipNodeModulesBundle: true,
  format: "esm",
  dts: false,
  platform: "node",
  keepNames: true,
  tsconfig: "./tsconfig.build.json",
  cjsInterop: true,
});
