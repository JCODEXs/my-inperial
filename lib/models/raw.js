import { connectToDatabase } from 'lib/mongodb';
import { ObjectId } from 'mongodb';
export const findRaw = async () => {
  const { db } = await connectToDatabase();
  const result = await db
    .collection('ivrit')
    .findOne({ _id: ObjectId('63058e88d1e19a66c635cba5') });
  return result;
};
// .aggregate([
//   {
//     $match: {
//       $or: [{ id: search }, { ref: search }],
//     },
//   },
//   {
//     $lookup: {
//       from: 'users',
//       localField: 'creation.by',
//       foreignField: '_id',
//       as: 'creation.by',
//     },
//   },
//   { $unwind: '$creation.by' },
//   {
//     $project: { 'creation.by.log': 0 },
//   },
// ])
