import { useOverlays } from "vStore/overlays";
import TodayIs from "./todayIs";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";
import { logOut, useLogin } from "vStore/login";
import { useJasmin } from "vStore/jasmin";
import { useEffect } from "preact/hooks";
import gsap from "gsap";
export default function TopBar() {
  const router = useRouter();
  const { user: userModal } = useOverlays();
  const { user, originalUser } = useLogin();
  const { allModels } = useJasmin();
  useEffect(() => {
    setInterval(() => {
      gsap.to("#logo", { duration: 2, rotateY: 360 });
    }, 10000);
  });
  return (
    <div
      id="headMenu"
      style="
            z-index:10;
background: rgb(0,40,20);
background: linear-gradient(90deg, rgba(0,20,40,1) 0%, rgba(0,10,20,1) 100%);
		  padding-left:10px; border-bottom:solid 2px rgb(100,100,100);
            gap:20px;
      "
    >
      <div
        style="
		    display:flex;align-items:center;
        flex-wrap:wrap;
                padding: 5px;
		    gap:10px;
        white-space:nowrap;
        margin: auto;
          min-width: min(95%,1000px);
          max-width: min(95%,1000px);
		    "
      >
        <div
          id="title"
          style="
                display:flex;
                flex: 1;
                gap:20px;
                font-weight: 1000;
                text-align:left;
                align-items:center;"
        >
          <img
            id="logo"
            style="height:20px;
                  transform:scale(1.6);
                  transform-origin: center;
                  z-index:1000;
                  padding:3px;"
            src="impe_logo_clean.png"
          />{" "}
          <TodayIs />
        </div>
        <button
          style="margin-left:auto;"
          onClick={() => userModal.ref.current.open()}
        >
          {`👤 `}

          {`${user._id !== originalUser._id ? "Viendo como" : ""} ${user.log.auth == "model"
              ? `${allModels?.find(
                (model) => model.screenName == user.model.jasmin
              )?.displayName
              }`
              : ` ${user.info.name}  ${user.info.surname} `
            } [${user.log.auth}] `}
        </button>
        {/*  ${user.info.name} ${user.info.surname} [${user.log.auth}]          */}
        {false && !isMobile && (
          <button
            onClick={() =>
              confirm("Estas seguro de CERRAR SESION?") && logOut(router)
            }
            class="btn"
          >
            <img style="max-height:15px;" src="/assets/offIcon.png" />
          </button>
        )}
      </div>
    </div>
  );
}
