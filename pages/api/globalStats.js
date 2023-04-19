// import { connectToDatabase } from 'lib/mongodb';
// import { ObjectId } from 'mongodb';
// import { getFiles } from 'lib/aws';
//
import { sessionConfig } from "/lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
import fs from "fs";
import { getGlobalStatsFromFiles } from "lib/jasmin";
// export default withIronSessionApiRoute(
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const year = req.query.year;
      try {
        let jasminStats = await getGlobalStatsFromFiles();
        let resumedStats = {};
        // if (fs.existsSync("jasminStats.json")) {
        //   jasminStats = JSON.parse(fs.readFileSync("jasminStats.json", "utf8"));
        // }
        // console.log("jasminStats: ", jasminStats);
        const timezones = ["lx", "co"];
        // Object.entries(jasminStats).map(([key, periodStats]) => {
        //   resumedStats[key] = {};
        //   timezones.forEach(
        //     (timezone) =>
        //       (resumedStats[key][timezone] = {
        //         total: {
        //           earnings: periodStats.global[timezone].reduce(
        //             (sum, model) =>
        //               sum +
        //               parseFloat(
        //                 isNaN(model.total.earnings.value)
        //                   ? 0
        //                   : model.total.earnings.value
        //               ),
        //             0
        //           ),
        //         },
        //       })
        //   );
        // });
        Object.entries(jasminStats).map(([key, periodStats]) => {
          if (key.includes(year)) {
            resumedStats[key] = {};
            timezones.forEach(
              (timezone) =>
                (resumedStats[key][timezone] = periodStats.global[timezone].map(
                  (stat) => ({
                    screenName: stat.screenName,
                    displayName: stat.displayName,
                    total: stat.total,
                  })
                ))
            );
          }
        });
        // console.log("VresumedStats: ", resumedStats);
        // { resumedStats[key] = { lx: { totals: jasminStats.global.lx }, co: { totals: jasminStats. } } });
        res.status(200).json({ [year]: resumedStats });
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
