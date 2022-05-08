# Minixt

### A tiny fork of [Quxt](https://github.com/QuxApp/quxt).

Minixt eliminates all dependencies of Quxt, allowing it to be used anywhere, not just in Node.
Minixt is also written in TypeScript.

## Changes

1. Server has been removed entirely because it depends on express and socket.io.
2. You use it like so: `import * as _ from "minixt"`/`const _ = require("minixt")`, not `const _ = new Minixt()`.