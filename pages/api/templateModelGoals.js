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
  const { templateID, screenName, value } = req.body;
  console.log("value",screenName)

  try {
    const updateResult = await db.collection("templates").updateOne(
      {
        _id: ObjectId(templateID),
        "models.screenName": screenName,
        // [`models.${day}.evaluatorId`]: ObjectId(evaluatorID),
      },
      { $set: { "models.$.goals": value } },
      // {
      //   arrayFilters: [
      //     { "model.screenName": screenName },
         
      //   ],
      // }
    );
    if (updateResult.matchedCount > 0) {
      console.log("YEAH");
      res.status(200).json({
        message: "Value updated successfully",
        body: {
          templateID,
          screenName,
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
