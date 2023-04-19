import { ObjectId, DBRef } from "bson";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionConfig } from "lib/session";
import { connectToDatabase } from "lib/mongodb";

export default withIronSessionApiRoute(async function editUser(req, res) {
  const user = req.session.user;
  const { db } = await connectToDatabase();
  var result;
  if (req.method === "PUT") {
    const status = {
      key: req.body.statusKey,
      by: req.body.by,
      utc: new Date(),
      media: req.body.media,
      items: req.body.items,
      responsible: req.body.responsible,
      note: req.body.note,
    };
    try {
      result = await db.collection("roomFollow").findOneAndUpdate(
        {
          _id: ObjectId(req.body._id),
        },
        {
          // $set: req.body.data,
          $push: {
            status,
          },
        },
        {
          returnNewDocument: true,
        }
      );
      res.status(200).json({ status });
    } catch (error) {
      console.error(error);
    }
  }
}, sessionConfig);
