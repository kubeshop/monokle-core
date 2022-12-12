import connect from "connect";
import crypto from "node:crypto";
import http from "node:http";
import readline from "node:readline";
import pc from "picocolors";
import { watch as watchRollup } from "rollup";
import { DIST_CONFIG } from "./rollupConfig.cjs";

type Bundle = {
  code: string;
  hash: string;
};

let NEXT_CONNECTION_ID = 0;
type ConnectionMap = Map<string, http.ServerResponse>;

/**
 * Start a server with basic HMR capabilities and forward a bundle on filechanges.
 **/
export function startDevServer() {
  let streams: ConnectionMap = new Map();
  let lastBundle: Bundle | undefined = undefined;

  const app = connect();
  app.use((req, res) => {
    const connectionId = String(NEXT_CONNECTION_ID++);
    streams.set(connectionId, res);

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
      streams.delete(connectionId);
      res.end();
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

    const payload = serialize({
      data: bundle,
    });

    for (const stream of streams.values()) {
      if ((stream as any).closed) continue;
      stream.write(payload);
    }
  });

  printStartMessage();
}

/**
 * Build a in-memory bundle which is rebuild on file changes.
 **/
function watch(onBundle: (bundle: Bundle) => void) {
  const [rollupConfig, outputConfig] = DIST_CONFIG;
  const watcher = watchRollup({
    ...rollupConfig,
    output: [outputConfig],
    watch: {
      skipWrite: true,
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
  console.log(pc.green("Monokle dev server (beta)"));
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
