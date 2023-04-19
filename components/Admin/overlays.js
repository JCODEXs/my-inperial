import ByDay from "./byDay";
import { useEffect, useRef } from "preact/hooks";
import Overlay from "components/Overlay";
import { useRouter } from "next/router";
import { sectionsUI } from "vStore/sections";
import { useSelected } from "vStore/selected";
import { useOverlays, setOverlay } from "vStore/overlays";
import { useAssets } from "vStore/assets";
import { useLogin, logOut, overwriteAuth } from "vStore/login";
import { useJasmin } from "vStore/jasmin";
import UserInfo from "./userInfo";
export default function Overlays() {
  const router = useRouter();
  const { neo, main, byDay, checkout, user: userModal } = useOverlays();
  const { performers, allPerformers } = useJasmin();
  const { user, originalUser } = useLogin();
  const { users } = useAssets();
  const fullUser = users?.find((usr) => usr._id == user._id);
  const { selected, section } = useSelected();
  const neoRef = useRef();
  const mainRef = useRef();
  const byDayRef = useRef();
  const userRef = useRef();
  const assets = useAssets();
  useEffect(() => {
    setOverlay("neo", neoRef);
    setOverlay("main", mainRef);
    setOverlay("byDay", byDayRef);
    setOverlay("user", userRef);
  }, []);
  return (
    <>
      <Overlay title={"USUARIO"} ref={userModal.ref}>
        <div style="height:100%;max-height:100%;display:flex;flex-direction:column;gap:10px;max-width:100%;">
          <div style="padding:10px;">
            <UserInfo user={fullUser} self={true} />
            {(originalUser.log.auth == "admin" ||
              originalUser.log.auth == "dev") && (
              <select
                onChange={(e) => {
                  overwriteAuth(e.target.value);
                }}
                style="float:right;"
              >
                {assets.users?.map(
                  (user) =>
                    (originalUser.log.auth == "dev" ||
                      user?.log?.auth !== "dev") && (
                      <option value={JSON.stringify(user)}>
                        {user?.log?.auth == "model"
                          ? `[${user.log.auth}] ${
                              allPerformers?.find(
                                (performer) =>
                                  user.model.jasmin == performer.screenName
                              )?.displayName
                            }`
                          : `[${user?.log?.auth}] ${user?.info?.name} ${user?.info?.surname}`}
                      </option>
                    )
                )}
              </select>
            )}
            <button style="" onClick={() => logOut(router)}>
              CERRAR SESION
            </button>
          </div>
          {user.log.auth == "dev" && (
            <div
              style="padding:10px;
flex:1;
            "
            >
              <iframe
                style="background:transparent;"
                src="https://discord.com/widget?id=1040695921983361024&theme=dark"
                allowtransparency="true"
                frameborder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              ></iframe>
            </div>
          )}
        </div>
      </Overlay>
      <Overlay title={"ESTADIA POR FECHA"} ref={byDay.ref}>
        <ByDay />
      </Overlay>
      <Overlay
        title={sectionsUI[section]?.title}
        ref={main.ref}
        onClose={() => {
          // router.push(`/admin?section=${section}`, undefined, {
          //   shallow: true,
          // });
        }}
      >
        {selected &&
          sectionsUI[section]?.fullUI(
            // selected,
            section !== "jasmin"
              ? assets[section].find((asset) => asset._id == selected)
              : performers.find(
                  (performer) => performer.screenName == selected
                ),
            main.ref
          )}
      </Overlay>
      <Overlay
        oname={"neo"}
        title={`📝 ${sectionsUI[section]?.title}`}
        ref={neo.ref}
        onClose={() => {
          // router.push(`/admin?section=${section}`, undefined, {
          //   shallow: true,
          // });
        }}
      >
        {sectionsUI[section]?.form}
      </Overlay>
      <Overlay title={"SOLUCIONAR ESTADIA"} ref={checkout.ref}>
        {/* <SolveCheck /> */}
      </Overlay>
    </>
  );
}
