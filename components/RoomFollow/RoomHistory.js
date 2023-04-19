//model grouped by day of the week
import React from "react";
import { getRoomOcupation } from "vStore/newRoomHistory";
import { useRef, useState } from "preact/hooks";
import { useAssets } from "vStore/assets";
import { useJasmin } from "vStore/jasmin";
function RoomHistory() {
  const { activePerformers } = useJasmin();
  const { rooms } = useAssets();
  const [dayOfWeek, setDayOfWeek] = useState(null);
  const [model, setModel] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [weeklyReport, setWeeklyReport] = useState({});
  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  async function filterResults() {
    try {
      console.log("1");
      const weekReport = await getRoomOcupation(
        roomId,
        model,
        startDate,
        endDate,
        dayOfWeek
      );
      console.log("21", weekReport);
      setWeeklyReport(weekReport);
    } catch (err) {
      console.log(err, "weekrepo");
    }
  }
  async function fetchData(roomId, model, startDate, endDate, dayOfWeek) {
    const weekReport = await getRoomOcupation(
      roomId,
      model,
      startDate,
      endDate,
      dayOfWeek
    );
  }
  function handleModelChange(e) {
    setModel(e.target.value);
    console.log(model);
  }
  function handleDayOfWeekChange(event) {
    setDayOfWeek(event.target.value);
  }
  function handleAvailableRoomsChange(event) {
    const selectedRooms = rooms.find(
      (room) => room.info.name === event.target.value
    )._id;
    setRoomId(selectedRooms);
    // if (Modelo.current) {
    //   setAvailableRooms(prevRooms => prevRooms.filter(roomId => {
    //     const room = props.rooms.find(r => r.id === roomId);
    //     return room && room.model === Modelo.current.value;
    //   }));
  }
  // const idref=useRef
  //     const start=useRef(startDate)
  return (
    <div
      style="
    display:flex;
    flex-direction:column;
    overflow-y:scroll;
    height: 95%;
    "
    >
      <>
        {/* <pre>{JSON.stringify(weeklyReport,null,2)}</pre> */}
        {/* <pre>{JSON.stringify(rooms,null,2)}</pre>*/}
        {/* <pre>{JSON.stringify(startDate,null,2)}</pre> */}
        selector
        <>
          <div
            style="
            display:flex;
            flex-direction:row;
            height:2.5rem;
            margin-top:20px;
            filter: drop-shadow(0 0 0.75rem black);
            border:solid silver 1px;
            padding:0.2rem
            "
          >
            <label style=" padding:1rem" htmlFor="availableRooms">
              Room:{" "}
            </label>
            <select
              id="availableRooms"
              onChange={handleAvailableRoomsChange}
              style={{ width: "30%" }}
            >
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.info.name}
                </option>
              ))}
            </select>
            <label style=" padding:1rem" htmlFor="Models">
              Model:{" "}
            </label>
            <select
              id="Models"
              onChange={handleModelChange}
              style={{ width: "50%" }}
            >
              {activePerformers.map((model) => (
                <option key={model.screenName} value={model.screenName}>
                  {model.displayName}
                </option>
              ))}
            </select>
          </div>
          <div
            style=" display: flex; flex-direction: column;margin-bottom:20px;
            filter: drop-shadow(0 0 0.75rem black);
            border:solid silver 1px;
            padding:1rem;
            width:10rem;
            "
            id="date-piker"
          >
            <input
              type="text"
              placeholder="Start Date"
              value={startDate ? startDate.toDateString() : ""}
              onFocus={() => setFocusedInput("startDate")}
            />
            <input
              style="display:flex;justify-content:flex-end"
              type="text"
              placeholder="End Date"
              value={endDate ? endDate.toDateString() : ""}
              onFocus={() => setFocusedInput("endDate")}
            />
            {focusedInput && (
              <div style="position:absolute;left:15rem;color:rgb(60,20,20,1);font-size:1.1rem;display:flex;justify-content:flex-end; z-index:4">
                <div onClick={() => setFocusedInput(null)}>Close</div>
                <div>
                  {focusedInput === "startDate" && (
                    <input
                      type="date"
                      value={startDate?.toISOString().substr(0, 10)}
                      onChange={(e) =>
                        handleDatesChange({
                          startDate: new Date(e.target.value),
                          endDate,
                        })
                      }
                    />
                  )}
                  {focusedInput === "endDate" && (
                    <input
                      type="date"
                      value={endDate?.toISOString().substr(0, 10)}
                      onChange={(e) =>
                        handleDatesChange({
                          startDate,
                          endDate: new Date(e.target.value),
                        })
                      }
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            style=" display: flex; flex-direction: column;margin-bottom:20px;
            filter: drop-shadow(0 0 0.75rem black);
            border:solid silver 1px;
            padding:1rem;
            width:10rem;
            "
          >
            <label htmlFor="dayOfWeek">Day of Week:</label>
            <select id="dayOfWeek" onChange={handleDayOfWeekChange}>
              <option value="">Any day</option>
              <option value="SESSION">Monday</option>
              <option value="FINALIZADO">Tuesday</option>
              <option value="APROBADO">Wednesday</option>
              <option value="ESPERANDO APROBACION">Thursday</option>
              <option value="ENTREGADO">Friday</option>
              <option value="ENTREGA RECHAZADA ">Saturday</option>
              <option value="RECHAZADO">Sunday</option>
            </select>
          </div>
          <button onClick={filterResults}>Filter</button>
        </>
      </>
      <table>
        <thead>
          <tr>
            <th>Day of the week</th>
            <th>Rooms</th>
          </tr>
        </thead>
        <tbody>
          {weeklyReport &&
            Object.keys(weeklyReport).map((dayOfWeek) => (
              <tr key={dayOfWeek}>
                <td>{dayOfWeek}</td>
                <td>
                  {weeklyReport[dayOfWeek].map((room) => (
                    <div key={room.roomid}>
                      <h4>{room.roomid}</h4>
                      {room.models.length > 0 ? (
                        room.models.map((model) => (
                          <div key={model.screenName}>
                            <img
                              src={
                                model.date ? model.url : "/path/to/emoticon.png"
                              }
                              alt={model.screenName}
                              style={{
                                border: "1px solid black",
                                borderRadius: "5%",
                              }}
                            />
                            <p>{model.screenName}</p>
                            {model.date && <p>{model.date}</p>}
                          </div>
                        ))
                      ) : (
                        <p>No models found</p>
                      )}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default RoomHistory;
// const UsoPorRoom:{
//     "Monday": [
//       {
//         "roomid": "room1",
//         "models": [
//           {
//             "screenName": "screen1",
//             "date": "2022-03-01T10:00:00.000Z"
//           },
//           {
//             "screenName": "screen2",
//             "date": "2022-03-01T14:00:00.000Z"
//           }
//         ]
//       },
//       {
//         "roomid": "room2",
//         "models": [
//           {
//             "screenName": "screen3",
//             "date": "2022-03-01T16:00:00.000Z"
//           }
//         ]
//       }
//     ],
//     "Tuesday": [
//       {
//         "roomid": "room1",
//         "models": [
//           {
//             "screenName": "screen4",
//             "date": "2022-03-02T11:00:00.000Z"
//           },
//           {
//             "screenName": "screen5",
//             "date": "2022-03-02T13:00:00.000Z"
//           }
//         ]
//       }
//     ]
//   }
