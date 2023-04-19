import { useUi, closeChart, openChart, toggleBlur } from "vStore/ui";
import { useLogin } from "vStore/login";
import { useOverlays } from "vStore/overlays";
import {
  useSelected,
  setSelected,
  setSection,
  setToggle,
} from "vStore/selected";
import Search from "./Search";
import { sectionsUI } from "vStore/sections";
import styles from "./admin.module.css";
import { uploadRoom } from "vStore/newRoom";
import { master } from "vStore/login";
export default function MainMenu() {
  const { blurred } = useUi();
  const { user } = useLogin();
  const { section } = useSelected();
  const { neo } = useOverlays();
  return (
    <div
      style="position:relative;border-top: 1.5px solid rgba(100, 100, 100, 0.6);
background: rgb(0,40,20);
background: linear-gradient(90deg, rgba(0,5,10,0.5) 0%, rgba(0,10,30,0.5) 100%);
      "
      onClick={closeChart}
      class={styles.driver}
    >
      {master()}
      <div
        style="display:flex;flex-direction:column;gap:10px;padding:5px;
        margin: auto;
          min-width: min(95%,1000px);
          max-width: min(95%,1000px);
        "
      >
        {/* <b style="">{sectionsUI[section]?.title?.toUpperCase()}</b> */}
        <div style="margin-top:3px;display:flex;flex-wrap:wrap;gap:10px;">
          <button
            class={!blurred && "tab_selected"}
            onClick={(e) => {
              e.stopPropagation();
              toggleBlur();
            }}
          >
            🕶️
          </button>
          {false && user.log.auth == "admin" && (
            <div style="display:flex; gap:5px;float:right;justify-content:right;">
              {/* <button */}
              {/*   style={{ float: 'right' }} */}
              {/*   onClick={(e) => { */}
              {/*     e.stopPropagation(); */}
              {/*     setToggle('wall'); */}
              {/*     openChart(); */}
              {/*   }} */}
              {/* > */}
              {/*   TAB */}
              {/* </button> */}
              <button
                style={{ float: "right" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setToggle("stats");
                  openChart();
                }}
              >
                📈
              </button>
            </div>
          )}
          <div style="margin-left:auto;display:flex;gap:5px;align-items:center;">
            {user.log.auth == "admin" && (
              <div style="display:flex;flex-direction:column;gap:5px;">
                <div
                  id="generalLight"
                  style="min-width:10px;min-height:10px;
                  background:rgba(20,20,30,0.8);
                  border-radius:50%;"
                ></div>
                <div
                  id="liveLight"
                  style="min-width:10px;min-height:10px;
                  background:rgba(20,30,20,0.8);
                  border-radius:50%;"
                ></div>
              </div>
            )}
            {Object.entries(sectionsUI).map(([key, value]) => {
              return (
                (user.log.auth == "dev" ||
                  (value.permission?.some((perm) => perm == user.log.auth) &&
                    !value.disabled)) && (
                  <button
                    class={key == section && "tab_selected"}
                    onClick={(e) => {
                      // e.stopPropagation();
                      // router.push(`/admin?section=${key}`, undefined, {
                      //   shallow: true,
                      // });
                      setSelected(null);
                      setSection(key);
                    }}
                  >
                    {value.label}
                  </button>
                )
              );
            })}
            {master() && (
              <>
                <div style="margin:0px 10px 0px 10px;border-left:solid 3px rgb(60,60,60);"></div>
                <button
                  style={{ float: "right" }}
                  class={section == "jasmin" && "disabled"}
                  disabled={
                    section == "jasmin" ||
                    (section == "rooms" && user.log.auth == "monitor")
                  }
                  onClick={(e) => {
                    // alert('Hola :)');
                    // e.stopPropagation();
                    // section == "users" && uploadUser(null);
                    section == "rooms" && uploadRoom(null);
                    // section == "shop" && uploadProd(null);
                    neo.ref.current.open();
                    // router.push(
                    //   `/admin?section=${section}&modal=new`,
                    //   undefined,
                    //   {
                    //     shallow: true,
                    //   }
                    // );
                  }}
                >
                  +
                </button>
              </>
            )}
          </div>
        </div>
        {false && user.log.auth != "model" && <Search />}
      </div>
    </div>
  );
}
