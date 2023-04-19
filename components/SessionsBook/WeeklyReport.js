import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WeeklyReport = ({ weeklyReport }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleImageClose = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      {Object.entries(weeklyReport).map(([day, images]) => (
        <div key={day}>
          <h2>{day}</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {images.map(({ roomid, images }) =>
              images.map((image, index) => (
                <div
                  key={`${day}-${roomid}-${index}`}
                  style={{ margin: "10px", cursor: "pointer" }}
                  onClick={() => handleImageClick({ ...image, date: day })}
                >
                  <img
                    src={image.url}
                    alt={image.description}
                    style={{ maxWidth: "200px" }}
                  />
                  <p>{image.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            key="image-modal"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={selectedImage.url}
                alt={selectedImage.description}
                style={{ maxWidth: "80vw", maxHeight: "80vh" }}
              />
              <p
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  color: "white",
                }}
              >
                {selectedImage.date} - {selectedImage.description}
              </p>
              <button
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "2em",
                  color: "white",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={handleImageClose}
              >
                &times;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeeklyReport;

// import { useState, useEffect } from 'react';
// import { MongoClient } from 'mongodb';

// function MyComponent() {
//   const [imageData, setImageData] = useState([]);

//   useEffect(async () => {
//     const uri = 'mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority';
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//     try {
//       await client.connect();
//       const database = client.db('<database>');
//       const collection = database.collection('roomfollow');

//       const result = await collection.aggregate([
//         {
//           $match: {
//             roomid: "_id",
//             date: {
//               $gte: ISODate("start_date"),
//               $lte: ISODate("end_date")
//             }
//           }
//         },
//         {
//           $group: {
//             _id: {
//               roomid: "$roomid",
//               date: "$date"
//             },
//             images: {
//               $push: {
//                 url: "$image.url",
//                 description: "$image.description"
//               }
//             }
//           }
//         }
//       ]).toArray();

//       setImageData(result);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       await client.close();
//     }
//   }, []);

//   // Render the component
//   return (
//     // Your JSX code here
//   );
// }
// if the query includes a particlar item to filter for 
//change  query
// roomfollow.aggregate([
//     {
//       $match: {
//         roomId: "_id",
//         date: {
//           $gte: ISODate("start_date"),
//           $lte: ISODate("end_date")
//         }
//       }
//     },
//     {
//       $unwind: "$inventory"
//     },
//     {
//       $match: {
//         "inventory.category": "category_name"
//       }
//     },
//     {
//       $group: {
//         _id: {
//           roomId: "$roomId",
//           date: "$date"
//         },
//         images: {
//           $push: {
//             url: "$image.url",
//             description: "$image.description"
//           }
//         }
//       }
//     }
//   ])
  

// JSON.stringify({
//     _id: {
//       roomId: "room_id",
//       date: ISODate("date")
//     },
//     images: [
//       {
//         url: "image_url",
//         description: "image_description"
//       },
//       {
//         url: "image_url",
//         description: "image_description"
//       },
  
//     ]
//   })
  


//   const weekRoom=roomFollow.aggregate([
//     {
//       $match: {
//         roomid: "_id",
//         date: {
//           $gte: ISODate("start_date"),
//           $lte: ISODate("end_date")
//         }
//       }
//     },
//     {
//       $unwind: "$inventory"
//     },
//     {
//       $match: {
//         "inventory.category": "category_name"
//       }
//     },
//     {
//       $group: {
//         _id: {
//           dayOfWeek: { $dateToString: { format: "%A", date: "$date" } },
//           roomid: "$roomid"
//         },
//         images: {
//           $push: {
//             url: "$image.url",
//             description: "$image.description"
//           }
//         }
//       }
//     },
//     {
//       $sort: { "_id.dayOfWeek": 1 }
//     }
//   ])
  
//   const WeeklyReport=roomFollow.aggregate([
//     {
//       $match: {
//         roomid: "_id",
//         date: {
//           $gte: ISODate("start_date"),
//           $lte: ISODate("end_date")
//         }
//       }
//     },
//     {
//       $unwind: "$inventory"
//     },
//     {
//       $match: {
//         "inventory.category": "category_name"
//       }
//     },
//     {
//       $group: {
//         _id: {
//           dayOfWeek: { $dateToString: { format: "%A", date: "$date" } },
//           roomid: "$roomid"
//         },
//         images: {
//           $push: {
//             url: "$image.url",
//             description: "$image.description",
//             date: "$date"
//           }
//         }
//       }
//     },
//     {
//       $group: {
//         _id: "$_id.dayOfWeek",
//         rooms: {
//           $push: {
//             roomid: "$_id.roomid",
//             images: "$images"
//           }
//         }
//       }
//     }
//   ])

  