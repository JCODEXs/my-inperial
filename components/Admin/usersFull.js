import Resume from "./userResume";
import { useState, useEffect, useLayoutEffect, useRef } from "preact/hooks";
import { useSelected } from "vStore/selected";
import { useAssets, getAdyacent } from "vStore/assets";
import { useLogin } from "vStore/login";
import { setField, calcTotals } from "vStore/totals";
import moment from "moment";
import AssetDisplay from "./assetDisplay";
import MakeItAdmin from "./makeItAdmin";
import gsap from "gsap";
import Overlay from "components/Overlay";
import UserInfo from "./userInfo";
import { sections } from "vStore/sections";
import All from "./all";
export default function UsersFull({}) {
  const [section, setSection] = useState("adq");
  const [tool, setTool] = useState(undefined);
  const { selected: userID } = useSelected();
  const [detailed, setDetailed] = useState(false);
  const { users } = useAssets();
  const overlayAdmin = useRef();
  const { user: user2 } = useLogin();
  const user = users.find((user) => user._id == userID);
  const closeTool = async () => {
    await gsap.to("#tool", { duration: 0.3, maxHeight: "0px" });
    setTool(undefined);
  };
  const openTool = () => {
    gsap.to("#tool", { duration: 0.3, maxHeight: "100%" });
  };
  useEffect(() => {
    setDetailed(false);
    if (user) {
      const { totalEstadia, totalCompras, totalPagos } = calcTotals(user);
      setField("totalEstadia", totalEstadia);
      setField("totalCompras", totalCompras);
      setField("totalPagos", totalPagos);
    }
  }, [user]);
  useLayoutEffect(() => {
    openTool();
    tool && section != "all" && setSection(tool);
  }, [tool]);
  useLayoutEffect(() => {}, [section]);
  return (
    <div style="display:flex;flex-direction:column;height:100%;border-bottom:2px solid blue;max-height:100%;overflow:hidden;">
      {user && (
        <>
          <div style="border-bottom:2px solid rgb(60,60,60);display:flex;gap:10px;align-items:center;padding:10px;">
            <div style="flex:1;">
              <b style="font-size:100%;">
                <UserInfo user={user} />
              </b>
            </div>
            {
              // (user.userInfo?.email !== 'konopimi@hotmail.com' &&
              // user2.log?.auth == 'admin') &&

              <button onClick={() => overlayAdmin.current.open()}>🔑</button>
            }
          </div>
          <Overlay title={`VOLVER ADMIN`} ref={overlayAdmin}>
            <MakeItAdmin
              user={user}
              onFinish={() => overlayAdmin.current.close()}
            />
          </Overlay>
          {false && (
            <div
              class="lol3"
              style="
              flex:1;
              overflow:hidden;
              display:flex;
              flex-direction:column;
              "
            >
              <div
                class="lol2"
                style="z-index:999999999;padding:5px;
  box-shadow: 0 0 0 2px rgb(100,100,100);
		    "
              >
                <Resume user={user} />
              </div>
              <div
                class="lol"
                style={`min-width:min(600px,100%);max-width:100%;
		    display:flex;flex-direction:column;overflow:hidden;flex:1;`}
              >
                <div
                  style={` transition:all 0.5s;background:${
                    tool ? sections[tool]?.background : "rgb(20,20,20)"
                  };border-bottom:2px solid rgba(60,60,60,0.6);`}
                >
                  <div
                    style="
                    border-bottom:2px solid rgba(120,120,120);
                    background:rgba(10,10,10,0.8);
                    padding:5px;
                    display:flex;
                    gap:5px;
                    align-items:stretch;
                    "
                  >
                    {Object.keys(sections)
                      .filter((key) => key != "all")
                      .map((key) => {
                        return (
                          <button
                            class={tool == key && "tab_selected"}
                            style="flex:1;"
                            onClick={() => setTool(key)}
                          >
                            {`+ ${sections[key].label.replace(/[A-Z]+/, "")}`}
                          </button>
                        );
                      })}
                  </div>
                  <div
                    id="tool"
                    style="max-height:0px;overflow:hidden;"
                    onMouseEnter={() => {
                      clearTimeout(self.to);
                    }}
                  >
                    {Object.keys(sections).map((section) => {
                      return (
                        <div
                          style={`display:${tool == section ? "block" : "none"};
			    width:100%;`}
                        >
                          {sections[section].content(user)}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  style={`  background:${sections[section]?.background};border-bottom:solid 2px rgb(60,60,60);`}
                >
                  <div style=" display:flex;flex-wrap:wrap;gap:5px;   background:rgba(5,5,5,0.6); padding:5px; ">
                    {Object.keys(sections).map((key) => {
                      return (
                        <button
                          style={
                            key == "all"
                              ? "font-size:80%;margin-right:30px;"
                              : "font-size:80%;"
                          }
                          class={detailed && section == key && "tab_selected"}
                          onClick={() => {
                            setDetailed(true);
                            setSection(key);
                            closeTool();
                          }}
                        >
                          {sections[key].label}
                        </button>
                      );
                    })}
                    {/* <button */}
                    {/*   style="margin-left:auto;" */}
                    {/*   onClick={() => setDetailed((prev) => !prev)} */}
                    {/* > */}
                    {/*   {!detailed ? 'DETALLE' : 'RESUME'} */}
                    {/* </button> */}
                    <button
                      style="margin-left:auto;"
                      class={!detailed && "tab_selected"}
                      // onClick={() => setDetailed((prev) => !prev)}a
                      onClick={() => {
                        setDetailed(false);
                        closeTool();
                      }}
                    >
                      {"RESUME"}
                    </button>
                  </div>
                </div>
                <div
                  style="flex:1;color:silver;background:rgba(10,10,10,0.8);overflow-y:scroll;max-height:100%;"
                  onScroll={() => {
                    self.to = setTimeout(() => {
                      tool && closeTool();
                    }, 150);
                  }}
                >
                  {/* {section == 'all' ? ( */}
                  <All user={user} section={section} detailed={detailed} />
                  {/* ) : user[section]?.length > 0 ? ( */}
                  {/*   (section == 'stay' */}
                  {/*     ? [...user[section]].sort((a, b) => */}
                  {/*         b.range[0] < a.range[0] ? -1 : 1 */}
                  {/*       ) */}
                  {/*     : [...user[section]].reverse() */}
                  {/*   ).map((asset) => { */}
                  {/*     // const item = assets.shop.find((item) => item._id == value.ref); */}
                  {/*     return ( */}
                  {/*       <AssetDisplay */}
                  {/*         asset={asset} */}
                  {/*         section={section} */}
                  {/*         sections={sections} */}
                  {/*         background={sections[section].background} */}
                  {/*       /> */}
                  {/*     ); */}
                  {/*   }) */}
                  {/* ) : ( */}
                  {/*   <div style="padding:10px;">{`NO HAY ${sections[section].label}`}</div> */}
                  {/* )} */}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
