import React from "react";
import ImageWithValidation from "./ImageValidator";

function weeklyRoom({ weeklyReport }) {
  return (
    <div>
      {Object.keys(weeklyReport).map((day) => (
        <div key={day}>
          <h2>{day}</h2>
          {weeklyReport[day].map((room) => (
            <div key={room.roomid}>
              <h3>{room.roomid}</h3>
              {room.images.map((image) => (
                   <ImageWithValidation
                    key={index}
                    src={image.url}
                    alt={image.description}
                    className="image-grid-image"
                  />
                
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default weeklyRoom
