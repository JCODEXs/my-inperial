import { withIronSessionApiRoute } from "iron-session/next";
import { ObjectId } from "mongodb";
import { sessionConfig } from "lib/session";
import { connectToDatabase } from "lib/mongodb";
export default withIronSessionApiRoute(async (req, res) => {
  if (req.method !== "PUT") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  const { db } = await connectToDatabase();
  const { templateID, screenName, day, moduleID, itemID, value } = req.body;
  console.log("value",value)
  const evaluatorID = req.session.user._id;
  console.log(req.body,evaluatorID);
  try {
    const updateResult = await db.collection("templates").updateOne(
      {
        _id: ObjectId(templateID),
        "models.screenName": screenName,
        // [`models.${day}.evaluatorId`]: ObjectId(evaluatorID),
      },
      {
        // $addToSet: {
        //   [`models.$[model].${day}`]: [{ evaluatorId: evaluatorID, }],
        // },
        $set: {
          [`models.$.${day}.${evaluatorID}.${itemID}`]: value,
        },
      },
      {
        arrayFilters: [
          { "model.screenName": screenName },
         
        ],
      }
    );
    if (updateResult.matchedCount > 0) {
      console.log("YEAH");
      res.status(200).json({
        message: "Value updated successfully",
        body: {
          templateID,
          screenName,
          day,
          evaluatorID,
          moduleID,
          itemID,
          value,
        },
      });
    } else {
      console.log("NO YEAH");
      res.status(404).json({ message: "Value not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating value" });
  }
}, sessionConfig);
