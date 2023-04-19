export const RoomObject = () => {
  const rooms = {};

  const addItem = (room, item, items) => {
    if (items.has(item)) {
      console.log(`Error: ${item} already exists.`);
    } else {
      rooms[room].items.push(item);
      items.add(item);
      items = [];
    }
  };

  for (let i = 1; i <= 40; i++) {
    const itemsr = new Set();
    rooms[i] = { room: i, items: [] };
    addItem(i, "tv", itemsr);
    addItem(i, "cama", itemsr);
    addItem(i, "PC", itemsr);
    addItem(i, "sabanas", itemsr);
    addItem(i, "lamparas", itemsr);
    //addItem(i, "Camara", itemsr);
  }
  return rooms;
  // Example us
};
