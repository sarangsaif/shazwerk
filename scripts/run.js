const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const command = process.argv[2] || "build";
const extraArgs = process.argv.slice(3);

let nodePath = process.execPath;
// On macOS, if Homebrew Node 21 exists, use it to ensure Node >= 18.17.0
if (process.platform === "darwin" && fs.existsSync("/opt/homebrew/bin/node")) {
  nodePath = "/opt/homebrew/bin/node";
}

const nextBin = path.join(__dirname, "..", "node_modules", "next", "dist", "bin", "next");

const env = { ...process.env };
if (fs.existsSync("/opt/homebrew/bin")) {
  env.PATH = `/opt/homebrew/bin:${env.PATH || ""}`;
}

const child = spawn(nodePath, [nextBin, command, ...extraArgs], {
  stdio: "inherit",
  env,
});

child.on("exit", (code) => {
  process.exit(code || 0);
});

child.on("error", (err) => {
  console.error("Failed to run Next.js:", err);
  process.exit(1);
});
