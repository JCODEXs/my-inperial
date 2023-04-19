import { getDailyStatsFromFiles } from "lib/jasmin";
// export default withIronSessionApiRoute(
export default async function filteredHandler(req, res) {
  switch (req.method) {
    case "GET":
      const period = req.query.period;
      const models =  req.query.models;
      try {
        let jasminStats = await getDailyStatsFromFiles();
        const timezones = ["lx", "co"];
        let resumedStats = {};
        console.log(jasminStats)
        await Promise.all(
          Object.entries(jasminStats[period].days).map(([key, dayStats]) => {
            console.log(jasminStats[period])
            resumedStats[key] = {};
            timezones.forEach(
              async (timezone) =>{
                (resumedStats[key][timezone] = await Promise.all(
                  dayStats[timezone]
                  .filter((stat) => models.includes(stat.screenName))
                  .map((stat) => ({
                    screenName: stat.screenName,
                    displayName: stat.displayName,
                    total: stat.total,
                    messengerDetails:stat.messengerDetails,

                  }))
                )
                )
           } );
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