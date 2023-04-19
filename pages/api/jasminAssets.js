// import { connectToDatabase } from 'lib/mongodb';
// import { ObjectId } from 'mongodb';
// import { getFiles } from 'lib/aws';
import axios from "axios";
import fs from "fs";
import { sessionConfig } from "lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
export default withIronSessionApiRoute(async function handler(req, res) {
  switch (req.method) {
    case "GET":
      let jasminAssets = {};
      const user = req.session.user;
      if (fs.existsSync("jasminAssets.json")) {
        jasminAssets = JSON.parse(fs.readFileSync("jasminAssets.json", "utf8"));
      }
      jasminAssets.lastPerformersState = req.lastReportersState;
      if (user.log.auth == "model") {
        jasminAssets.reporters.items = jasminAssets.performers.items.filter(
          (performer) => performer.screenName == user.model?.jasmin
        );
      }
      res.status(200).json(jasminAssets);
      break;
    default:
      res.status(404).json({});
      break;
  }
}, sessionConfig);
