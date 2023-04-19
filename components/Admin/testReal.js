import { useState } from "react";
import { makeItRealTest, destroyReal } from "vStore/assets";
export default function TestReal() {
  const [port, setPort] = useState();
  const [host, setHost] = useState();
  return (
    <div>
      Socket Test
      <input
        placeholder="host"
        onChange={(e) => setHost(e.target.value)}
      ></input>
      <input
        placeholder="port"
        onChange={(e) => setPort(e.target.value)}
      ></input>
      <button
        onClick={() => {
          makeItRealTest(host, port);
        }}
      >
        CONNECT
      </button>
      <button
        onClick={() => {
          destroyReal();
        }}
      >
        DESTROY
      </button>
    </div>
  );
}
