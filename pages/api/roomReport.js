import { ObjectId, DBRef } from 'bson';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionConfig } from 'lib/session';
import { connectToDatabase } from 'lib/mongodb';


export default withIronSessionApiRoute(async function editUser(req, res) {
  const user = req.session.user;
  const { db } = await connectToDatabase();
  // Set up the MongoDB aggregation pipeline
  const pipeline = [
    {
      $match: {
        roomid: "_id",
        date: {
          $gte: ISODate("start_date"),
          $lte: ISODate("end_date")
        }
      }
    },
    {
      $unwind: "$inventory"
    },
    {
      $match: {
        "inventory.category": "category_name"
      }
    },
    {
      $group: {
        _id: {
          dayOfWeek: { $dateToString: { format: "%A", date: "$date" } },
          roomid: "$roomid"
        },
        images: {
          $push: {
            url: "$image.url",
            description: "$image.description",
            date: "$date"
          }
        }
      }
    },
    {
      $group: {
        _id: "$_id.dayOfWeek",
        rooms: {
          $push: {
            roomid: "$_id.roomid",
            images: "$images"
          }
        }
      }
    },
    // {
    //   $out: "weeklyReport"
    // }

   
  ];

  // Run the MongoDB aggregation pipeline
var result;
 
  if (req.method === 'get') {
    try{

    console.log('roomReport', req.body);
    result = await db.collection("roomFollow'").aggregate(pipeline).toArray();
       res.status(200).json({ result, info: req.body.info });}
  catch(error){
    console.error(error)
  }}
}, sessionConfig);


