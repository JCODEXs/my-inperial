import { proxy } from 'valtio';
import { Client, MUC } from 'y-xmpp';

// Define the initial state for the chat application
const initialState = {
  messages: [],
  rooms: {}, // Add a new field to store the group chat rooms
};

// Create a new Valtio store to manage the state of the chat application
const store = proxy(initialState);

// Define an action to add a new message to the chat
function addMessage(state, message) {
  state.messages.push(message);
}

// Define an action to join a group chat room
function joinRoom(state, roomJid, nickname) {
  // Check if the room is already joined
  if (state.rooms[roomJid]) {
    // The room is already joined, return without doing anything
    return;
  }

  // Create a new MUC instance for the room
  const muc = new MUC(client);

  // Join the room
  muc.join(roomJid, nickname);

  // Send a message to the group chat room
  muc.send(`${nickname} has joined the room`);

  // Handle incoming messages from the group chat room
  muc.on('message', message => {
    store.addMessage({
      id: message.attrs.id,
      from: message.attrs.from,
      body: message.getChildText('body'),
    });
  });

  // Add the MUC instance to the state
  state.rooms[roomJid] = muc;
}

// Define an action to leave a group chat room
function leaveRoom(state, roomJid) {
  // Check if the user is in the room
  if (!state.rooms[roomJid]) {
    // The user is not in the room, return without doing anything
    return;
  }

  // Get the MUC instance for the room
  const muc = state.rooms[roomJid];

  // Leave the room
  muc.leave();

  // Remove the MUC instance from the state
  delete state.rooms[roomJid];
}

// Connect to the XMPP server
const client = new Client({
  jid: 'your-jid@example.com',
  password: 'your-password',
});

// Define a custom hook to access the Valtio store
function useChat() {
  const [state, setState] = useState(store.state);

  useEffect(() => {
    const unsubscribe = store.subscribe(setState);
    return unsubscribe;
  }, []);

  return {
    state,
    addMessage: store.addMessage,
    joinRoom: store.joinRoom,
    leaveRoom: store.leaveRoom,
  };
}

export default useChat;

import React from 'react';
import useChat from './chatHook';

function Chat() {
  // Use the chat hook to access the state and actions of the chat application
  const { state, addMessage, joinRoom, leaveRoom } = useChat();

  // Render the chat UI
  return (
    <div>
      {/* Render the list of messages */}
      <ul>
        {state.messages.map(message => (
          <li key={message.id}>
            {message.from}: {message.body}
          </li>
        ))}
      </ul>

      {/* Render the group chat rooms */}
      <ul>
        {Object.keys(state.rooms).map(roomJid => (
          <li key={roomJid}>
            {roomJid}
            <button onClick={() => leaveRoom(roomJid)}>Leave</button>
          </li>
        ))}
      </ul>

      {/* Render the form to send a message */}
      <form
        onSubmit={e => {
          e.preventDefault();
          const message = e.target.elements.message.value;
          addMessage(message);
          e.target.elements.message.value = '';
        }}
      >
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>

      {/* Render the form to join a group chat room */}
      <form
        onSubmit={e => {
          e.preventDefault();
          const roomJid = e.target.elements.roomJid.value;
          const nickname = e.target.elements.nickname.value;
          joinRoom(roomJid, nickname);
          e.target.elements.roomJid.value = '';
          e.target.elements.nickname.value = '';
        }}
      >
        <input type="text" name="roomJid" placeholder="Room JID" />
        <input type="text" name="nickname" placeholder="Nickname" />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default Chat;
