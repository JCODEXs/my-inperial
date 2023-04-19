import { connectToDatabase } from 'lib/mongodb';
import { ObjectId } from 'mongodb';
// import { getFiles } from 'lib/aws';
import { sessionConfig } from '/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
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
    case 'POST':
      console.log('_id: ', req.body.userId);
      const adq = {
        _id: new ObjectId(),
        ...req.body.adq,
        user: new ObjectId(req.body.userId),
        creation: {
          utc: new Date(),
          by: new ObjectId(req.session.user._id),
        },
      };

      result = await db.collection('users').update(
        { _id: ObjectId(req.body.userId) },
        {
          $push: {
            adq,
          },
        }
      );
      console.log(result);
      res.status(200).json({ result, adq });
      break;
    case 'DELETE':
      result = await db.collection('users').updateOne(
        { _id: ObjectId(req.body.userId) },
        {
          $pull: {
            adq: { _id: ObjectId(req.body.adqId) },
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
