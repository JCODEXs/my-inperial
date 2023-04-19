import { connectToDatabase } from 'lib/mongodb';
import { ObjectId } from 'mongodb';
// import { getFiles } from 'lib/aws';
import { sessionConfig } from '/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
export default withIronSessionApiRoute(async function handler(req, res) {
  const { db } = await connectToDatabase();
  switch (req.method) {
    // case 'GET':
    //   // const asset = { id: req.body, files: await getFiles(req.body) };
    //   // res.status(404).json(asset);
    //   res
    //     .status(200)
    //     .json({ id: req.query.id, files: await getFiles(req.query.id) });
    //   break;
    case 'POST':
      const result = await db.collection('assets').insertOne({
        ...req.body,
        creation: {
          utc: new Date(),
          by: new ObjectId(req.session.user._id),
        },
      });
      // console.log(result);
      res.status(200).json({});
      break;
    default:
      res.status(404).json({});
      break;
  }
}, sessionConfig);
