import { connectToDatabase } from "lib/mongodb";
import { ObjectId } from "mongodb";
// import { getFiles } from 'lib/aws';
import { sessionConfig } from "/lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
import bcrypt from "bcryptjs";
export default withIronSessionApiRoute(async function handler(req, res) {
  const { db } = await connectToDatabase();
  let result;
  console.log(req.body);
  const infoOptions = {};
  // req.body.email && (infoOptions.email = req.body.email);
  // req.body.email && (infoOptions.email = req.body.username);
  switch (req.method) {
    case "POST":
      console.log("_id: ", req.body.userId);
      result = await db.collection("users").update(
        { _id: ObjectId(req.body.userId) },
        {
          $set: {
            "info.email": req.body.email,
            log: {
              auth: req.body.auth,
              pass: bcrypt.hashSync(req.body.pass, 8),
              screenName:req.body.screenName,
            },
          },
        }
      );
      console.log(result);
      res.status(200).json({ result });
      break;
    default:
      res.status(404).json({});
      break;
  }
}, sessionConfig);
