import { versions } from "node:process"

const [major, minor] = versions.node.split(".", 2).map((value) => Number.parseInt(value, 10)) as [number, number]

if (Boolean((major >= 20 && minor >= 11) || major >= 21) === false) {
    console.error("This program must be executed with Node >= v20.11.1")
    process.exit(1)
}
