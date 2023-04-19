import { connectToDatabase } from 'lib/mongodb';
export default async (req, res) => {
  const { db } = await connectToDatabase();
  console.log('connecting');
  const response = await db
    .collection('users')
    .findOne({ 'info.email': req.body.email });

  res.status(200).json({ user: response });
};
