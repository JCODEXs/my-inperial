import { connectToDatabase } from 'lib/api/util/mongodb';
export const create = async (collection, data) => {
  const { db } = await connectToDatabase();
  const res = db.collection(collection).insertOne(data);
  return res;
};
export const getAll = async (collection) => {
  const { db } = await connectToDatabase();
  return db.collection(collection).find({}).toArray();
};
export const get = async (collection, offset = 0, limit = 0) => {
  const { db } = await connectToDatabase();
  return db.collection(collection).find({}).skip(offset).limit(limit).toArray();
};
export const remove = async (collection, _id) => {
  const { db } = await connectToDatabase();
  return db.collection(collection).deleteOne({ _id: ObjectId(_id) });
};
export const setField1 = async (collection, _id, data) => {
  const { db } = await connectToDatabase();
  return db.collection(collection).updateOne(
    { _id: ObjectId(req.body._id) },
    {
      $addToSet: {
        comments: data,
      },
    }
  );
};
export const setField2 = async (collection, _id, field) => {
  const { db } = await connectToDatabase();
  const operation = req.body.flagValue ? '$addToSet' : '$pull';
  return db.collection(collection).updateOne(
    { _id: ObjectId(_id) },
    {
      [operation]: {
        [field]: ObjectId(req.body._id),
      },
    },
    { upsert: false }
  );
};
export const setField3 = async (collection) => {
  const { db } = await connectToDatabase();
  return db.collection(collection).updateOne(
    { _id: ObjectId(req.body._id) },
    {
      $set: {
        [req.body.flag.id]: req.body.flag.value,
      },
    }
  );
};

