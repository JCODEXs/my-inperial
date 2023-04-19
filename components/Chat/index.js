import { useAssets } from "vStore/assets";
import { useJasmin } from "vStore/jasmin";
import { useState, useLayoutEffect } from "preact/hooks";
import { makeChatReal, useChat, putOnline } from "vStore/chat";
// import { useWindowSize } from "lib/useWindowSize.js";
export default function Chat() {
  const { users } = useAssets();
  const { online } = useChat();
  const { activePerformers } = useJasmin();
  const [chatShown, setChatShown] = useState(false);
  const [actual, setActual] = useState();
  const user = actual;
  // const wSize = useWindowSizssss();
  useLayoutEffect(() => {
    window.innerWidth;
    // alert(chatShown);
  }, [chatShown]);
  useLayoutEffect(() => {
    // try {
    //   makeChatReal();
    // } catch (e) {}
    putOnline();

    // setTimeout(() =>
    //   setChatShown(false);
    // }, 15000);
  }, []);

  useLayoutEffect(() => {
    // try {
    //   makeChatReal();
    // } catch (e) {}
    // setTimeout(() =>
    //   setChatShown(false);
    // }, 15000);
  }, [window.innerWidth]);
  const hideChat = () => setChatShown(false);
  return (
    <div>
      <div style="position:fixed;bottom:0px;z-index:99999999;"></div>
      {chatShown ? (
        <div
          style="display:flex;
position:fixed;bottom:0px;right:0px;
z-index:1000;height:100%;
          width:100%;
          "
        >
          <div
            style="display:flex;
flex-direction:column;
            flex:1;
            background:rgba(40,40,40,0.8);
            backdrop-filter: blur(10px);"
          >
            <div style="flex:1;">
              <div
                style="
                padding:8px;
                background:black;
                border-bottom:2px solid silver;
                "
              >
                {actual ? (
                  actual.info.name ? (
                    <div>{`${user.info.name} ${user.info.surname} [${user.log.auth}]`}</div>
                  ) : (
                    <div>{`💃${
                      activePerformers?.find(
                        (model) => model.screenName == user.model.jasmin
                      )?.displayName
                    } ${""}`}</div>
                  )
                ) : (
                  "SELECCIONA A ALGUIEN PARA CHATEAR"
                )}
              </div>
              PRUEBA DE CHAT
              <div style="padding:10px;">
                <div class="chatMe chat">Hola</div>
                <div class="chatOther chat">Buenas</div>
              </div>
            </div>
            <div style="padding:10px;display:flex;">
              <input style="flex:1;height:60px;" type="textarea" />
            </div>
          </div>
          <div
            style="display:flex;flex-direction:column;height:100%;width:300px;background:black;border-left:solid 2px lime;overflow-y:scroll;overflow-x:hidden;
  filter: drop-shadow(0 0 0.2rem rgba(10, 10, 10, 1));
              z-index:10000000;
            "
          >
            <div
              style=" 
        display:flex;
        align-items:center;
position:sticky;top:0px;padding:5px;background:black;color:lime;
                border-bottom:2px solid silver;
        "
            >
              <b style="flex:1;">CHAT</b>
              <button
                onClick={() => {
                  setTimeout(() => {
                    setChatShown(false);
                  }, 100);
                }}
              >
                X
              </button>
            </div>
            <div style="padding:3px;background:rgb(60,60,60);border-bottom:1px solid silver;">
              conversaciones
            </div>
            <div
              style="padding:3px;background:rgb(60,60,60);
border-bottom:1px solid silver;
        "
            >
              online
            </div>
            {users.map((user) => {
              const isOnline = online.find((onl) => onl == user._id);
              return (
                <div
                  style="display:flex;align-items:center;gap:10px;"
                  onClick={() => {
                    setActual(user);
                  }}
                  class="chatUser"
                >
                  <div
                    style={`
height:10px;width:10px;
border-radius:50%;
border: 2px solid rgb(60,60,60);
background:${isOnline ? "lime" : "gray"}`}
                  ></div>
                  <div>
                    {user.info.name ? (
                      <div>{`${user.info.name} ${user.info.surname} [${user.log.auth}]`}</div>
                    ) : (
                      <div>{`💃${
                        activePerformers?.find(
                          (model) => model.screenName == user.model.jasmin
                        )?.displayName
                      } ${""}`}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          style="background: rgba(10,10,10,0.6);
            backdrop-filter: blur(5px);
            z-index:99999;padding:10px;
            border-radius:50%;
            border: solid 2px silver;
            height:25px;
            width:25px;
            display:flex;
            position:fixed;bottom:10px;left:10px;
            align-items:center;justify-content:center;"
          onClick={() => {
            setChatShown(true);
          }}
        >
          <b>💬</b>
        </div>
      )}
    </div>
  );
}
