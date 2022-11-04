import readline from "node:readline";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import connect from "connect";
import crypto from "node:crypto";
import http from "node:http";
import { watch as watchRollup } from "rollup";
import { terser } from "rollup-plugin-terser";
import pc from "picocolors";

type Bundle = {
  code: string;
  hash: string;
};

main();

/**
 * Start a server with basic HMR capabilities and forward a bundle on filechanges.
 **/
function main() {
  let connected = false;

  let lastResponse: http.ServerResponse<http.IncomingMessage> | undefined =
    undefined;
  let lastBundle: Bundle | undefined = undefined;

  const app = connect();
  app.use((req, res) => {
    if (connected) {
      console.log("warning - already connected");
      res.writeHead(503);
      res.end();
      return;
    }

    lastResponse = res;
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache,no-transform",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    });

    req.socket.addListener("close", () => {
      res.end();
      connected = false;
    });

    if (lastBundle) {
      const payload = serialize({
        data: lastBundle,
      });
      res.write(payload);
    }
  });
  const server = http.createServer(app);
  server.on("error", (err) => console.error(err));
  server.listen(33030);

  watch((bundle) => {
    lastBundle = bundle;

    if (lastResponse && !lastResponse?.closed) {
      const payload = serialize({
        data: bundle,
      });
      lastResponse.write(payload);
    }
  });

  printStartMessage();
}

/**
 * Build a in-memory bundle which is rebuild on file changes.
 **/
function watch(onBundle: (bundle: Bundle) => void) {
  const minify = false;
  const watcher = watchRollup({
    input: "src/plugin.ts",
    plugins: [typescript(), nodeResolve(), ...(minify ? [terser()] : [])],
    output: [
      {
        file: "dist/plugin.js",
        format: "esm",
      },
    ],
    watch: {
      skipWrite: true,
    },
    onwarn(warning, defaultHandler) {
      const ignoreCodes = ["TS7006", "TS7031"];
      const knownErrors = ["Cannot find module '@monokle/validation/custom'"];
      const skip =
        ignoreCodes.some((c) => warning.pluginCode === c) ||
        knownErrors.some((e) => warning.message.includes(e));

      if (skip) {
        return;
      }
      defaultHandler(warning);
    },
  });

  watcher.on("event", async (event) => {
    if (event.code !== "BUNDLE_END") {
      return;
    }

    const build = event.result;
    const { output } = await build.generate({
      file: "dist/plugin.js",
      format: "esm",
    });
    const code = output[0].code;
    const hash = crypto.createHash("md5");
    hash.update(code);

    const bundle = {
      code,
      hash: hash.digest("hex"),
    };

    onBundle(bundle);
  });

  watcher.on("event", (event) => {
    if (
      event.code === "START" ||
      event.code === "BUNDLE_START" ||
      event.code === "END"
    ) {
      return;
    }
    event.result?.close();
  });
}

/**
 * A server-sent event, consisting of the following properties:
 * - id: the identifier of the event.
 * - type: the type, for example `'userconnect'` or `'usermessage'`.
 * - data: the data.
 * - retry: reconnection time, in milliseconds.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
 */
export type ServerSentEvent = {
  id?: string;
  type?: string;
  data: Object;
  retry?: number;
};

function serialize(event: ServerSentEvent): string {
  const { id, type, retry, data } = event;
  const result: string[] = [];

  if (id) result.push(`id: ${id}\n`);
  if (type) result.push(`event: ${type}\n`);
  if (retry) result.push(`retry: ${retry}\n`);
  if (data) result.push(`data: ${JSON.stringify(data)}\n`);
  result.push("\n");

  return result.join("");
}

function printStartMessage() {
  clearScreen();
  console.log(pc.green("Monokle dev server (alpha)"));
  console.log();
  console.log(
    "You can now develop and preview your rules in real-time within Monokle Cloud."
  );
  console.log();
  console.log("tip: make sure you have developer mode enabled.");
}

function clearScreen() {
  const repeatCount = process.stdout.rows - 2;
  const blank = repeatCount > 0 ? "\n".repeat(repeatCount) : "";
  console.log(blank);
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
}
