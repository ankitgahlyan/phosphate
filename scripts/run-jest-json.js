const { runCLI } = require("jest")
const fs = require("fs")
const path = require("path")

;(async () => {
  const outDir = path.resolve(__dirname, "../reports")
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }
  const outFile = path.join(outDir, "jest-results.json")

  // Run Jest programmatically; pass any CLI args by process.argv.slice(2) if needed
  const argv = {
    // request JSON results
    json: true,
    // run in band to simplify output ordering in CI / local runs
    runInBand: true,
    // collect coverage? uncomment if you need it
    // collectCoverage: true,
    // default to run only shard.spec.ts
    testPathPattern: "shard\\.spec\\.ts$"
  }

try {
    const args = process.argv.slice(2)

    const getArgValue = (short, long) => {
        const i = args.findIndex(a => a === short || a === long)
        return i === -1 ? null : args[i + 1] || null
    }
    const hasFlag = (...flags) => flags.some(f => args.includes(f))

    const escapeReg = s => s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")

    const makeRegexForItem = it => {
        if (/\.(spec|test)\./.test(it)) return escapeReg(it) + '$'
        return escapeReg(it) + '.*\\.spec\\.ts$'
    }

    if (hasFlag('--all', '-a')) {
        // run all tests: ensure we don't constrain by testPathPattern
        delete argv.testPathPattern
    } else if (getArgValue('-s', '--suite')) {
        const val = getArgValue('-s', '--suite')
        const items = val.split(',').map(s => s.trim()).filter(Boolean)
        argv.testPathPattern = items.map(makeRegexForItem).join('|')
    } else {
        // No interactive prompt: keep default argv.testPathPattern ("shard\\.spec\\.ts$")
        // This avoids running all tests unintentionally in non-interactive environments.
    }

    // Ensure Jest CLI argv shape is present so runCLI respects provided options
    argv._ = argv._ || []
    argv.$0 = argv.$0 || "jest"

    // ensure we always capture results to save them even if tests fail or runCLI throws
    let results = null
    try {
        const res = await runCLI(argv, [process.cwd()])
        results = res && res.results ? res.results : null
    } catch (err) {
        // runCLI might throw but include results on the error; capture if present
        if (err && err.results) results = err.results
        // rethrow so outer catch handles logging/exit after writing results
        throw err
    }

    if (results) {
        fs.writeFileSync(outFile, JSON.stringify(results, null, 2), { encoding: "utf8" })
        console.log("Jest results written to:", outFile)
    } else {
        console.warn("No Jest results available to write.")
    }

    process.exit(results && results.success ? 0 : 1)
} catch (err) {
    // attempt to write any results attached to the thrown error
    try {
        if (err && err.results) {
            fs.writeFileSync(outFile, JSON.stringify(err.results, null, 2), { encoding: "utf8" })
            console.log("Jest results (from error) written to:", outFile)
        }
    } catch (writeErr) {
        console.error("Failed to write jest results:", writeErr)
    }

    console.error("Failed to run jest:", err)
    // if we had results use their success flag, otherwise exit 2 for runner failure
    const exitCode = (err && err.results) ? (err.results.success ? 0 : 1) : 2
    process.exit(exitCode)
}
})()
