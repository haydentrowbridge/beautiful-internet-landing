// Next.js dev server wrapper — satisfies the CLAUDE.md `node serve.mjs` convention
import { spawn } from "child_process";

const child = spawn("npm", ["run", "dev"], {
  stdio: "inherit",
  cwd: import.meta.dirname,
});

child.on("exit", (code) => process.exit(code ?? 0));
