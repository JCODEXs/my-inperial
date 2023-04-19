import { ObjectId, DBRef } from "bson";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionConfig } from "lib/session";
import { connectToDatabase } from "lib/mongodb";
export default withIronSessionApiRoute(async function editUser(req, res) {
  const user = req.session.user;
  const { db } = await connectToDatabase();
  console.log(" what is goin on");
  var result;
  if (req.method === "PUT") {
    console.log("body ", req.body);
    result = await db.collection("users").updateOne(
      {
        _id: ObjectId(user._id),
      },
      {
        $set: {
          media: req.body.media,
        },
      }
    );

    console.log(result);
    res.status(200).json({ result, info: req.body.info });
  }
}, sessionConfig);
