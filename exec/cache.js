const { reportsCache, downloadAllReports } = require("../lib/jasmin.js");
const next = require("next");
const hostname = "localhost";
const port = 3001;
const dev = process.env.NODE_ENV !== "production";
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
app.prepare().then(async () => {
  await downloadAllReports();
  reportsCache();
});
