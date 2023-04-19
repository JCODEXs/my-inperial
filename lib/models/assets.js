const { connectToDatabase } = require("../mongodb");
const { getSignedURL } = require("../wasabi");
const findAssets = async (collection, searchTerm = "") => {
  const { db } = await connectToDatabase();
  // const search = { $regex: `${searchTerm}`, $options: "i" };
  // console.log("searching");
  const result = await db
    .collection(collection)
    .find({})
    // .sort({ $natural: -1 })
    .toArray();
  // console.log("result");
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
//
const requestRoomFollow = async () =>
  await Promise.all(
    (
      await findAssets("roomFollow")
    ).map(async (follow) => ({
      ...follow,
      status:
        follow.status &&
        (await Promise.all(
          follow.status.map(async (status) => ({
            ...status,
            media:
              status.media &&
              (await Promise.all(
                status.media.map(async (md) => ({
                  ...md,
                  uri: await getSignedURL(md.location),
                }))
              )),
          }))
        )),
    }))
  );
const requestNews = async () => {
  return await Promise.all(
    (
      await findAssets("news")
    ).map(async (press) => ({
      ...press,
      media:
        press.media &&
        (await Promise.all(
          press.media.map(async (md) => ({
            ...md,
            uri: await getSignedURL(md.location),
          }))
        )),
    }))
  );
};
const requestUsers = async () => {
  return await Promise.all(
    (
      await findAssets("users")
    ).map(async (user) => ({
      ...user,
      media:
        user.media &&
        (await Promise.all(
          user.media.map(async (md) => ({
            ...md,
            uri: await getSignedURL(md.location),
          }))
        )),
    }))
  );
};
const getInitialAssets = async (user) => {
  // if (user.log.auth == "admin" || user.log.auth == "dev") {
  return {
    users: await requestUsers(),
    rooms: await findAssets("rooms"),
    roomFollow: await requestRoomFollow(), // templates: await findAssets("templates
    shop: await findAssets("shop"),
    news: await requestNews(), //
  };
  // }
  // else{
  //
  //   return {
  //     rooms: await findAssets("rooms"),
  //     roomFollow: await requestRoomFollow(), // templates: await findAssets("templates
  //     shop: await findAssets("shop"),
  //     news: await requestNews(), // templates: await findAssets("templates"),
  //   };
  // }
};
module.exports = {
  findAssets,
  requestNews,
  requestRoomFollow,
  requestUsers,
  getInitialAssets,
};
