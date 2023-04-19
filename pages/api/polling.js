import { sessionConfig } from "/lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
import { getInitialAssets } from "lib/models/assets";
export default withIronSessionApiRoute(async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const user = req.session.user;
      const result = await getInitialAssets(user);
      res.status(200).json(JSON.stringify(result));
      break;
    default:
      res.status(404).json({});
      break;
  }
}, sessionConfig);
