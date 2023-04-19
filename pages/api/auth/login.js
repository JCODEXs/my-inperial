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
    // delete result.log;
    var user = {
      isLoggedIn: true,
      _id: result._id,
      info: result.info,
      log: result.log,
      model: result.model,
    };
    console.log("result ", result);
    // result.model && (user.model = result.model);
    console.log("Te user for sesion: ", user);
    req.session.user = user;
    await req.session.save();
    //res.redirect('/admin');
    res.status(200).json({ user: result });
  } else {
    res.status(200).json("Log-In Failed");
  }
}, sessionConfig);
