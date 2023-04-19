import { ObjectId } from 'mongodb';
import { connectToDatabase } from 'lib/mongodb';
import bcrypt from 'bcryptjs';
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const params = {
    info: req.body.info,
    //connectionInfo: { ip: req.connection.remoteAddress },
  };
  req.body.log &&
    (params.log = { pass: bcrypt.hashSync(req.body.log.pass, 8) });
  const response = await db.collection('users').insertOne(params);
  res.status(200).json({ user: response });
};
