import type { UserConfig } from "@commitlint/types"

const Configuration: UserConfig = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   */
  extends: ["@commitlint/config-conventional"],
  /*
   * https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-conventional/README.md
  */
  rules: {
    "header-max-length": [1, "always", 100],
    "subject-case": [
      2,
      "never",
      [
        "upper-case",
        "pascal-case",
        "start-case",
      ]
    ]
  }
}


module.exports = Configuration