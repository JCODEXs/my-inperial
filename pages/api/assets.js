import { connectToDatabase } from "lib/mongodb";
import { ObjectId } from "bson";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const result = await Promise.all(
    req.body.assets.map(async (id) => {
      return db
        .collection(req.body.collection)
        .deleteOne({ _id: ObjectId(id) });
    })
  );
  res.status(200).json(result[0]);
}
