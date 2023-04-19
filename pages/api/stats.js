// import { connectToDatabase } from 'lib/mongodb';
// import { ObjectId } from 'mongodb';
// import { getFiles } from 'lib/aws';
//
import { sessionConfig } from "/lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
import fs from "fs";
import { getDailyStatsFromFiles } from "lib/jasmin";
// export default withIronSessionApiRoute(
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const period = req.query.period;
      try {
        let jasminStats = await getDailyStatsFromFiles();
        const timezones = ["lx", "co"];
        let resumedStats = {};
        // console.log("estats", jasminStats)
        await Promise.all(
          Object.entries(jasminStats[period].days).map(([key, dayStats]) => {
            resumedStats[key] = {};
            timezones.forEach(
              async (timezone) =>
                (resumedStats[key][timezone] = await Promise.all(
                  dayStats[timezone].map((stat) => ({
                    screenName: stat.screenName,
                    displayName: stat.displayName,
                    total: stat.total,
                  }))
                ))
            );
          })
        );
        res.status(200).json({
          [period]: resumedStats,
          availableStats: Object.keys(jasminStats).filter(
            (key) => jasminStats[key].days
          ),
        });
      } catch (e) {
        res.status(500).json({ result: "test" });
        console.log(e);
      }
      break;
    default:
      res.status(404).json({});
      break;
  }
}
// }, sessionConfig);
