// import { connectToDatabase } from 'lib/mongodb';
// import { ObjectId } from 'mongodb';
// import { getFiles } from 'lib/aws';
//aaaaa
import { findAssets, requestRoomFollow, requestNews } from "lib/models/assets";
// export default withIronSessionApiRoute(
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      console.log("getting section data");
      const section = req.query.section;
      console.log(section);
      try {
        const sectionData = await (() => {
          switch (section) {
            case "news":
              return requestNews();
            case "roomFollow":
              return requestRoomFollow();
            default:
              return findAssets(section);
          }
        })();
        console.log(sectionData);
        res.status(200).json({
          [section]: sectionData,
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
