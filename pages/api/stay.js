import { connectToDatabase } from 'lib/mongodb';
import { ObjectId } from 'mongodb';
// import { getFiles } from 'lib/aws';
import { sessionConfig } from '/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
export default withIronSessionApiRoute(async function handler(req, res) {
  const { db } = await connectToDatabase();
  let result;
  console.log(req.body);
  switch (req.method) {
    case 'DELETE':
      result = await db.collection('users').updateOne(
        { _id: ObjectId(req.body.userId) },
        {
          $pull: {
            stay: { _id: ObjectId(req.body.stayId) },
          },
        }
        // { upsert: false }
      );
      console.log(result);
      res.status(200).json({ result });
      break;
    case 'POST':
      console.log('_id: ', req.body.userId);
      const stay = {
        _id: new ObjectId(),
        ...req.body.stay,
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
            stay,
          },
        }
      );
      console.log(result);
      res.status(200).json({ result, stay });
      break;
    default:
      res.status(404).json({});
      break;
  }
}, sessionConfig);
