import { connectToDatabase } from "lib/mongodb";
import fs from "fs";
export default async (req, res) => {
  let jasminAssets = {};
  // const user = req.session.user;
  console.log(req.body);
  if (fs.existsSync("jasminAssets.json")) {
    jasminAssets = JSON.parse(fs.readFileSync("jasminAssets.json", "utf8"));
    console.log(jasminAssets.models);
    const model = jasminAssets.models?.items.find(
      (model) =>
        model.displayName == req.body.model ||
        model.screenName == req.body.model
    );
    const { db } = await connectToDatabase();
    console.log("connecting");
    const response =
      model &&
      (await db
        .collection("users")
        .findOne({ "model.jasmin": model.screenName }));
    res.status(200).json({ user: response });
  }
};
