// import { connectToDatabase } from 'lib/mongodb';
// import { ObjectId } from 'mongodb';
// import { getFiles } from 'lib/aws';
import axios from "axios";
import { sessionConfig } from "/lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
// export default withIronSessionApiRoute(
import moment from "moment";
import "moment-timezone";
const tz = "Europe/Luxembourg";
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const screenName = req.query.screenName;
      const jasminApi = "https://partner-api.modelcenter.jasmin.com";
      const jk =
        "Bearer 0eb98a8d9f616b0d54b6ea575e4b9ae91a410c64b955f0b5b470cf11e9b16a4b";
      const instance = axios.create({ baseURL: jasminApi });
      instance.defaults.headers.common["Authorization"] = jk;
      let result, result2;
      console.log(req.query);
      try {
        result = await instance.get(`/v1/vip-shows/${screenName}`, {
          params: {
            fromDate: moment(req.query.fromDate).tz(tz).format(),
            toDate: moment(req.query.toDate).tz(tz).format(),
            limit: 400,
          },
        });
        result2 = await instance.get(`/v1/reports/performers/${screenName}`, {
          params: {
            fromDate: moment(req.query.fromDate).tz(tz).format(),
            toDate: moment(req.query.toDate).tz(tz).format(),
          },
        });
        res
          .status(200)
          .json({ vip: result.data.data, report: result2.data.data });
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
