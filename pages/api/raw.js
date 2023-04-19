import { connectToDatabase } from 'lib/mongodb';
import { ObjectId } from 'mongodb';
//import { getFiles } from 'lib/aws';
import { sessionConfig } from '/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  let result;
  switch (req.method) {
    case 'DELETE':
      console.log(req.body.raw);
      result = await db.collection('ivrit').updateOne(
        { _id: ObjectId('63058e88d1e19a66c635cba5') },
        {
          $pull: { raw: req.body.raw },
        }
      );
      console.log(result);
      res.status(200).json({ result, raw: req.body.raw });
      break;
    case 'POST':
      result = await db.collection('ivrit').updateOne(
        { _id: ObjectId('63058e88d1e19a66c635cba5') },
        {
          $push: { raw: req.body.raw },
        }
      );
      console.log(result);
      res.status(200).json({ result, raw: req.body.raw });
      break;
    case 'PUT':
    // db.collection.updateOne(
    //   { _id: ObjectId('63058e88d1e19a66c635cba5') },
    //   {"raw.0"},
    //   { $set: { 'raw.0': 'the_new_timestamp' } }
    // );
    case 'GET':
      result = await db
        .collection('other')
        .find({ _id: ObjectId('63058e88d1e19a66c635cba5') });
      res.status(200).json({ result });
    default:
      res.status(404).json({});
      break;
  }
}
