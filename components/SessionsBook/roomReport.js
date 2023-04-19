import React from "react";

function RoomReport({ data }) {
    return (
      <div className="room-report">
        {Object.keys(data).map(day => (
          <div key={day} className="room-report-day">
            <h2>{day}</h2>
            {data[day].map(room => (
              <div key={room.roomid} className="room-report-room">
                <h3>{room.roomid}</h3>
                <div className="room-report-images">
                  {room.images.map(image => (
                    <div key={image.url} className="room-report-image">
                      <img src={image.url} alt={image.description} />
                      <div className="room-report-tag">
                        {image.description}
                        <br />
                        {new Date(image.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  

export default RoomReport;
