import styles from "./admin.module.css";
import { useAssets, setAssets, deleteAsset, pinNew } from "vStore/assets";
import { useSelected, setSection, setSelected } from "vStore/selected";
import { useOverlays } from "vStore/overlays";
import { useLogin } from "vStore/login";
import { sectionsUI } from "vStore/sections";
import { uploadUser } from "vStore/register";
import { useUi, toggleDebug, closeChart } from "vStore/ui";
import { uploadRoom } from "vStore/newRoom";
import { uploadProd } from "vStore/newProd";
import { useEffect } from "preact/hooks";
import axios from "axios";
import { master } from "vStore/login";
import { Virtuoso } from "react-virtuoso";
export default function AssetsDisplay() {
  const { neo, main } = useOverlays();
  const { section } = useSelected();
  const assets = useAssets();
  const { debug } = useUi();
  const { user } = useLogin();
  var filteredAssets = [];
  //////// ESTO ESTA RARO
  filteredAssets =
    section != "news" &&
    section != "rooms" &&
    section != "templates" &&
    !master()
      ? user.log.auth === "model"
        ? assets[section]?.filter((asset) => asset?.model == user.model?.jasmin)
        : assets[section]?.filter((asset) => asset.monitor == user._id)
      : assets[section];
  ///////// LO ANTERIOR ESTA RARO
  //
  // var realAsset = assets[section] && [
  //   ...(user.log.auth == "admin" ? assets[section] : filteredAssets),
  // ];
  //const invertedAsset= (section=="roomFollow")?(section=="template")?realAsset.sort((a,b)=>{return new Date(a.creation.utc) - new Date(b.creation.utc)}):realAsset.reverse():realAsset;
  var something = filteredAssets;
  if (section == "news") {
    something &&
      (something = [
        ...something.filter(
          (press) =>
            user._id == press.creation.by ||
            press.toShare?.some((shared) => shared == user._id)
        ),
      ]
        .reverse()
        .sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1)));
  } else if (section == "rooms") {
    something &&
      (something = [...something].sort((a, b) => a.info.name - b.info.name));
  } else if (section == "roomFollow") {
    // alert("yay");
    something &&
      (something = [...something].sort(
        (a, b) =>
          new Date(
            b.status ? b.status[b.status.length - 1].utc : b.creation.utc
          ) -
          new Date(
            a.status ? a.status[a.status.length - 1].utc : a.creation.utc
          )
      ));
    // false &&
  } else if (section == "template") {
    something && (something = [...something].reverse());
  }
  //console.log("modelactualInverted",section,invertedAsset)
  //
  // return (
  //   <div>
  //     lol<pre>{JSON.stringify(asset👥s[section], null, 2)}</pre>
  //   </div>
  // );
  useEffect(async () => {
    if (section !== "jasmin" && !assets[section]) {
      const result = await axios.get("api/section", { params: { section } });
      // console.log(result);
      setAssets(result.data);
    }
  }, [section]);
  return assets[section]?.length > 0 ? (
    <Virtuoso
      id="viewport"
      style={{
        position: "relative",
        height: "100%",
        maxHeight: "100%",
        flex: 1,
        maxWidth: "100%",
        minWidth: "300px",
        overflowY: "scroll",
        overflowX: "hidden",
        overscrollBehaviorY: "none",
        margin: "auto",
        minWidth: "min(100%,1000px)",
        maxWidth: "min(100%,1000px)",
        borderLeft: "2px solid rgba(40,40,40,0.5)",
        borderRight: "2px solid rgba(40,40,40,0.5)",
      }}
      data={something}
      itemContent={(index, asset) => {
        return (
          <div
            key={asset._id}
            class={styles.asset}
            style={`${asset.pinned && "position:sticky;top:0px;"}`}
            onClick={() => {
              setSelected(asset._id);
              // setSelected(asset);
              // router.push(`/admin?section=${section}&modal=main`, undefined, {
              //   shallow: true,
              // });
              // alert(main.current);
              main.ref?.current?.open();
            }}
          >
            <div
              style="flex:1;
              overflow:hidden;
              position:relative;
              "
            >
              {!debug ? (
                sectionsUI[section]?.ui(asset)
              ) : (
                <div
                  style="
                    color:rgb(10,200,120) !important;
                    background:rgba(20,50,100,0.3);
                    overflow:hidden;
                    "
                >
                  <pre
                    style="
                    padding:5px;
                    overflow-y:auto;
                    max-height:300px;
                      "
                  >
                    {JSON.stringify(asset, null, 2)}
                  </pre>
                </div>
              )}
            </div>
            {master() && (
              <div
                style="
border-left:solid 2.5px rgb(20,20,20);
				  width:45px;
				  min-width:45px;
				  display:flex;"
              >
                {
                  <div
                    style="position:sticky;top:0px;display:flex;flex-direction:column;
				      gap: 5px;
				      padding:3px;
				      align-items:center;
				      width:100%;
				      "
                  >
                    {(section == "users" ||
                      (section == "rooms" && user.log.auth == "admin") ||
                      (section == "shop" && user.log.auth == "admin")) && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          section == "users" && uploadUser(asset._id);
                          section == "rooms" && uploadRoom(asset._id);
                          section == "shop" && uploadProd(asset._id);
                          neo.ref.current.open();
                        }}
                      >
                        ✏️
                      </button>
                    )}
                    {user.log.auth == "dev" && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteAsset(section, asset._id);
                        }}
                      >
                        🗑️
                      </button>
                    )}
                    <div style="flex:1;" />
                    {(user.log.auth == "admin" ||
                      true ||
                      user.info.email == "konopimi@hotmail.com") && (
                      <>
                        {section == "news" && (
                          <div style="padding:10px;">
                            <button
                              class={asset.pinned && "tab_selected"}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                pinNew(asset._id, !asset.pinned);
                              }}
                              style={`filter: invert(${
                                !asset.pinned ? "0" : "0.6"
                              });`}
                            >
                              📌
                            </button>
                          </div>
                        )}
                        {user.log.auth == "dev" && (
                          <button
                            class={debug && "tab_selected"}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleDebug();
                            }}
                          >
                            {"{ }"}
                          </button>
                        )}
                      </>
                    )}
                  </div>
                }
              </div>
            )}
          </div>
        );
      }}
      onScroll={(e) => {
        closeChart();
        const elem = e.target;
        // if (
        //   (elem.scrollHeight - elem.scrollTop) * 0.7 <=
        //   elem.clientHeight
        // ) {
        //   console.log("yeah");
        //   incrementBatch();
        // }
      }}
      class={styles.viewport}
      onClick={closeChart}
    />
  ) : (
    <div class={styles.noMagic}>
      <h4>{!assets[section] ? "LOADING" : "NO SE ENCONTRARON RESULTADOS"}</h4>
    </div>
  );
}
