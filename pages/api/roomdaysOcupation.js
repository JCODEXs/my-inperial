import { ObjectId, DBRef } from 'bson';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionConfig } from 'lib/session';
import { connectToDatabase } from 'lib/mongodb';




export default withIronSessionApiRoute(async function requestRoom(req, res) {
  const user = req.session.user;
  const { room_id,model,startDate,endDate,dayOfWeek} = req.body;

  console.log("roomhistory",req.body)
  const { db } = await connectToDatabase();
  // Set up the MongoDB aggregation pipeline
  const pipeline = [
    {
      $match: {
        roomId: room_id,
       //"$model.screenName":model,
       
        //  startDate: {$gte: startDate},
        // finishDate:{$lte: endDate} 
      },
     
      },
     
        // {
        //   $match: {
        //     startDate: {$gte: startDate} 
        //   },             
        //   },

      {
        $match: { approve:dayOfWeek
        }
      },
    // {
    //  $unwind: "$model"
    // },
    {
      $group: {
        _id: {
        // dayOfWeek: { $dateToString: { format: "%A", date: "$date" } },
          roomId: "$roomId"
        },
        models: {
          $push: {
            screenName: "$model.screenName",
            date: ["$startDate","$finishDate"],
            approve:"$approve",
            follow_id:"$_id"
            // url: "$image.url",
            // description: "$image.description"
          }
        }
      }
    },
    
    // {
    //   $group: {
    //     _id: "$_id.dayOfWeek",
    //     rooms: {
    //       $push: {
    //         roomId: "$_id.roomId",
    //         models: "$models"
    //       }
    //     }
    //   }
    // }
    // {
    //   $out: "weeklyReport"
    // }
  ];

  // Run the MongoDB aggregation pipeline
var result;
 
  if (req.method === 'POST') {
    try{

    console.log('roomReport', req.body);
    result = await db.collection('roomFollow').aggregate(pipeline).toArray();
       res.status(200).json({ result, info: req.body.info })
       console.log(result,"result");}
  catch(error){
    console.error(error)
  }}

  // if (req.method === 'post') {
  //   try{

  //   console.log('roomReport', req.body);
  //   result = await db.collection("roomFollow'").aggregate(pipeline2).toArray();
  //      res.status(200).json({ result, info: req.body.info });}
  // catch(error){
  //   console.error(error)
  // }}


}, sessionConfig);


