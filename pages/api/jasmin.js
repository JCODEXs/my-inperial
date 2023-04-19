// import { connectToDatabase } from 'lib/mongodb';
// import { ObjectId } from 'mongodb';
// import { getFiles } from 'lib/aws';
import axios from 'axios';
import { sessionConfig } from '/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
// export default withIronSessionApiRoute(
export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const screenNames = req.query.screenNames;
      const jasminApi = 'https://partner-api.modelcenter.jasmin.com';
      const jk =
        'Bearer 0eb98a8d9f616b0d54b6ea575e4b9ae91a410c64b955f0b5b470cf11e9b16a4b';
      const instance = axios.create({ baseURL: jasminApi });
      instance.defaults.headers.common['Authorization'] = jk;
      let result;
      try {
        result = await instance.get(`/v1/performer-states`, {
          params: { screenNames, offset: 0, limit: 1000 },
        });

        res.status(200).json({ live: result.data.data });
      } catch (e) {
        res.status(500).json({ result: 'test' });
        console.log(e);
      }
      break;
    default:
      res.status(404).json({});
      break;
  }
}
// }, sessionConfig);
