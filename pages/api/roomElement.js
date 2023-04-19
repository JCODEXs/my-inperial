import { connectToDatabase } from "lib/mongodb";
import { ObjectId } from "mongodb";
// import { getFiles } from 'lib/aws';
import { sessionConfig } from "/lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
export default withIronSessionApiRoute(async function handler(req, res) {
  const { db } = await connectToDatabase();
  let result;
  switch (req.method) {
    // case 'GET':
    //   // const asset = { id: req.body, files: await getFiles(req.body) };
    //   // res.status(404).json(asset);
    //   res
    //     .status(200)
    //     .json({ id: req.query.id, files: await getFiles(req.query.id) });
    //   break;
    case "PUT":
      console.log("body ", req.body);
      const mod = {};
      Object.entries(req.body.params).forEach(([key, value]) => {
        mod[`${req.body.collection}.$.${key}`] = value;
      });

      const value = req.body.value;
      result = await db.collection("rooms").updateOne(
        {
          _id: ObjectId(req.body.roomId),
          [`${req.body.collection}._id`]: ObjectId(req.body.elementId),
        },
        {
          $set: mod,
        }
      );

      console.log(result);
      res.status(200).json({ result, value });
      break;
    case "POST":
      console.log("_id: ", req.body);
      const element = {
        _id: new ObjectId(),
        ...req.body.element,
        room: new ObjectId(req.body.roomId),
        creation: {
          utc: new Date(),
          by: new ObjectId(req.session.user._id),
        },
      };

      result = await db.collection("rooms").updateOne(
        { _id: ObjectId(req.body.roomId) },
        {
          $push: {
            [req.body.collection]: element,
          },
        }
      );
      console.log(result);
      res.status(200).json({ result, element });
      break;
    case "DELETE":
      result = await db.collection("rooms").updateOne(
        { _id: ObjectId(req.body.roomId) },
        {
          $pull: {
            [req.body.collection]: { _id: ObjectId(req.body.elementId) },
          },
        }
        // { upsert: false }
      );
      console.log(result);
      res.status(200).json({ result });
      break;
    default:
      res.status(404).json({});
      break;
  }
}, sessionConfig);
