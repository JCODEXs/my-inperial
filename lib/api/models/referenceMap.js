import { ObjectId } from "bson";
import { connectToDatabase } from "lib/api/util/mongodb";
const { db } = await connectToDatabase();
const references = {
    channels: 'users',
    products: 'users',
    orders: 'channels'
};
export const setReference = async (collectionFrom, _idFrom, to) => {
    console.log(_idTo);
    console.log(_idFrom);

    return await db.collection(to.ref.$ref)
        .updateOne(
            { _id: new ObjectId(to.ref.$_id) },
            {
                $addToSet: {
                    [key]: { ref: new ObjectId(_idFrom), ...data }
                }
            }, { upsert: false }
        );
};
export const setDefaultReference = async (collection, _idFrom, refs) => {
    await Promise.all(Object.keys(refs).map((key) => {
        setReference(collection, _idFrom, refs[key]);
    }));

};
export const setCrossReference = async (fromCollection, toCollection, _idFrom, _idTo, data) => {
    const res1 = await setReference(fromCollection, toCollection, _idFrom, _idTo, data);
    console.log(res1, ' res1');
    const res2 = await setReference(toCollection, fromCollection, _idTo, _idFrom, data);
    console.log(res2, ' res2');

};
