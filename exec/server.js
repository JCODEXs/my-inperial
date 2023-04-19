// server.js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const ws = require("ws");
const { Server } = require("socket.io");
const {
  updateStats,
  updateStories,
  updateData,
  updatePerformers,
  getAndSaveDayStats,
  downloadAllReports,
} = require("../lib/jasmin.js");
const cron = require("node-cron");
const moment = require("moment-timezone");
// const Sentry = require("@sentry/node");
// Sentry.init({
//   dsn: "http://aa1d4b16f91e4771a72c6e45ecd85ea4@sentry.kpm.codes:9000/2",
//   environment: "test",
//   release: "test",
//   integrations: [
//     // enable HTTP calls tracing
//     new Sentry.Integrations.Http({ tracing: true }),
//   ],
//
//   // We recommend adjusting this value in production, or using tracesSampler
//   // for finer control
//   tracesSampleRate: 1.0,
// });
const withSentry =
  (fn) =>
  async (...args) => {
    try {
      await fn(...args);
    } catch (error) {
      // Sentry.captureException(error);
      console.error(error);
    }
  };
let io;
var lastPerformersState = { performers: [] };
// const fs = require("fs");
const refreshStats = withSentry(async () => {
  const stats = await updateStats();
  io.emit("refreshStats", stats);
});
const refreshStories = withSentry(async () => {
  const stories = await updateStories();
  io.emit("refreshStories", stories);
});
const refreshPerformers = withSentry(async () => {
  const diff = await updatePerformers(lastPerformersState);
  if (diff.length > 0) {
    io.emit("refreshPerformers", diff);
  }
});
app.prepare().then(async () => {
  // const sv = new ws.Server({ port: 1234 });
  const server = createServer(async (req, res) => {
    try {
      req.lastPerformersStatete = lastPerformersState.performers;
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
  io = new Server(server, {
    // path: '/socket.io', // or any other path you need
  });
  io.on("connection", (socket) => {
    // your sockets here
  });
  cron.schedule(
    "38 21 * * *",
    withSentry(() => {
      console.log("Running a job at 00:00 at America/Bogota timezone");
      getAndSaveDayStats(moment().subtract(12, "hours").format("YYYY-MM-DD"));
    }),
    {
      scheduled: true,
      timezone: "America/Bogota",
    }
  );
  setInterval(refreshStats, 2 * 60 * 1000);
  setInterval(refreshStories, 1 * 60 * 60 * 1000);
  setInterval(refreshPerformers, 4 * 1000);
  withSentry(() => {
    updateData();
    updatePerformers(lastPerformersState);
    downloadAllReports();
  });
});
