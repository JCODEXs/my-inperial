import { connectToDatabase } from "lib/mongodb";
import { sessionConfig } from "/lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
import bcrypt from "bcryptjs";
export default withIronSessionApiRoute(async function loginRoute(req, res) {
  const { db } = await connectToDatabase();
  const result = await db
    .collection("users")
    .findOne({ "info.email": req.body.email });
  console.log(req.body);
  console.log(result);
  const match = bcrypt.compareSync(req.body.pass, result.log.pass);
  console.log("match", match);
  if (match) {
    //res.redirect('/admin');
    res.status(200).json({ user: result });
  } else {
    res.status(200).json("Log-In Failed");
  }
}, sessionConfig);
