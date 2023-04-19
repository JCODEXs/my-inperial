import { ObjectId, DBRef } from "bson";
import {
  get,
  getAll,
  create,
  // setField1,
  // setField2,
  // setField3,
  remove,
} from "lib/api/models/default.js";
import { setDefaultReference } from "lib/api/models/referenceMap.js";
// import { DBRef } from "bson";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionConfig } from "lib/session";
export default withIronSessionApiRoute(async function slugRoute(req, res) {
  const user = req.session.user;
  const { slug } = req.query;
  const collection = slug[0];
  let field;
  let _id;
  // slug[1] && (field = slug[1]);
  // if (field) {
  //   const data = {
  //     comment: req.body.comment,
  //     createdBy: new ObjectId(user._id),
  //   };
  //   await fieldOperation(collection, _id, field, data);
  // } else {
  await defaultOperation(collection, req, res, user);
  // }
}, sessionConfig);
const defaultOperation = async (collection, req, res, user) => {
  let response;
  const data = { ...req.body.data };
  console.log(data);
  if (req.method === "POST") {
    var refs = req.body.refs;
    if (true || user) {
      refs = {
        // issuers: [{ ref: DBRef('users', ObjectId(user._id)) }],
        ...refs,
      };
      data.creation = {
        utc: new Date(),
        by: new ObjectId(req.session.user._id),
      };
      response = await create(collection, data);
    }
    // data.refs = refs;
    // const refRes = await setDefaultReference(
    //     collection,
    //     response.insertedId,
    //     refs
    // );
    // console.log(refRes);
  } else if (req.method === "PUT") {
    throw Error(
      "PUT operation needs the field pattern. api/[collection]/[field]. For example api/music/comments"
    );
  } else if (req.method === "GET") {
    response = await get(collection, ...req.body);
  } else if (req.method === "DELETE") {
    response = await remove();
  }
  console.log("the response: ", response);
  res.json({ response, data });
};
// const fieldOperation = async (collection, _id, field, data) => {
//   await setField1(collection, _id, field);
//   await setField2(collection, _id);
//   await setField3(collection);
// };
