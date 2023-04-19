import { useEffect, useState, useRef } from "preact/hooks";
import { calcTotals } from "vStore/totals";
import { useJasmin } from "vStore/jasmin";
import { useOverlays } from "vStore/overlays";
import { setSelected, setSection } from "vStore/selected";
import { useAssets, changeUserMedia } from "vStore/assets";
import { useRouter } from "next/router";
import { countries } from "countries-list";
import currency from "currency.js";
import Overlay from "components/Overlay";
import UploadFiles from "components/Submit/UploadFiles";
import { useSubmit } from "vStore/submit";
export default function UserInfo({ user, see, self = false }) {
  const { allPerformers } = useJasmin();
  const { main } = useOverlays();
  const { newSubmission } = useSubmit();
  const router = useRouter();
  const o_usr = useRef();
  const [total, setTotal] = useState(0);
  // const { time } = useTime();
  useEffect(() => {
    const { totalCompras, totalEstadia, totalPagos } = calcTotals(user);
    setTotal(totalCompras + totalEstadia - totalPagos);
  }, [user]);
  return (
    <>
      {self && (
        <Overlay ref={o_usr}>
          <div
            style="padding:20px;
          display:flex;
          flex-direction:column;
            gap:20px;
            "
          >
            <div> Cambia tu foto de usuario</div>
            <UploadFiles />
            <button
              disabled={newSubmission.length == 0 && "disabled"}
              class={newSubmission.length == 0}
              onClick={async () => {
                await changeUserMedia(user._id);
                o_usr.current.close();
              }}
            >
              CAMBIAR
            </button>
          </div>
        </Overlay>
      )}
      {user && user.info && (
        <div
          style="padding:10px;
          padding-left:10px;
          max-width:100%;
          display:flex;
          flex-direction:column;
          gap:3px;
          "
        >
          <div
            style="font-size:100%;
		  font-weight:bolder;
		  display:flex;gap:10px;
		  align-items:center;
		  max-width:100%;"
          >
            <div style="position:relative;" class="usrImg">
              {self && (
                <button
                  style="
                  position:absolute;
                  bottom:-2px;right:-6px;
                  z-index:2;"
                  onClick={() => {
                    o_usr.current.open();
                  }}
                >
                  ✏️
                </button>
              )}
              <img
                src={
                  user.media && user.media[0]
                    ? user.media[0].uri
                    : "https://thearrivalstore.com/wp-content/uploads/2016/04/default_user_icon.jpg"
                  // : user.model
                  // ? "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.kym-cdn.com%2Fphotos%2Fimages%2Fnewsfeed%2F001%2F418%2F159%2F3c8.png&f=1&nofb=1&ipt=84fc5bd802712bc68e950a0bb49cf533802a59fbc344ae5c2ede6bb4aeb25569&ipo=images"
                  // : "https://img1.cgtrader.com/items/2374040/e60a06f88e/npc-character-proto-series-free-download-3d-model-low-poly-rigged.jpg"
                }
                style="
                object-fit:cover;
                width:60px;
                height:60px;
                border-radius:50%;
                filter: drop-shadow(0 0 0.5rem black);
                "
              />
            </div>
            <div style="max-width:40px;min-width:0px;">
              {false &&
                (user.info?.country ? (
                  <div style="display:flex;gap:10px;">
                    <img
                      src={
                        "https://www.countryflagsapi.com/png/" +
                        user.ifo?.country?.toLowerCase()
                      }
                      style="
box-shadow: 0px 0px 3px rgba(160,160,160,0.9);
		    border-radius:3px;width:25px;"
                    />
                    {/* <div style="">{`(${user.info?.country})`}</div> */}
                  </div>
                ) : (
                  <div style="display:flex;gap:10px;">
                    <div
                      style="
			  background:rgb(20,20,20);
box-shadow: 0px 0px 3px rgba(160,160,160,0.9);
		    border-radius:3px;width:25px;
			  padding:1px;
			text-align:center;
			  width:25px;
				min-width:25px;
			  "
                    >
                      {" ¿ ? "}
                    </div>
                    {/* <div>{'(¿ ?)'}</div> */}
                  </div>
                ))}
            </div>
            <div style="flex:1;">
              <div style="">
                {user.info.name && user.info.surname ? (
                  `${user.info.name} ${user.info?.surname}`
                ) : (
                  <div style="">Pendiente por editar ✏️</div>
                )}
              </div>
              <div style="display:flex;margin:3px;">
                {user.model && (
                  <button
                    class="modelBadge"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSection("jasmin");
                      setSelected(user.model.jasmin);
                      main.ref.current.open();
                    }}
                  >
                    {`LJ: ${
                      allPerformers?.find(
                        (performer) => performer.screenName == user.model.jasmin
                      )?.displayName
                    }`}
                  </button>
                )}
              </div>
            </div>
            <div
              style="min-width:60px;text-align:right;
		  "
            >
              {user.log?.auth}
            </div>
            {see && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push(
                    `/admin?section=users&modal=main&id=${user._id}`,
                    undefined,
                    {
                      shallow: true,
                    }
                  );
                }}
              >
                VER USUARIO
              </button>
            )}
          </div>
          <div style="display:flex;width:100%;">
            <div style="flex:1;font-size:62%;margin-top:5px;">
              {countries[user.info.country]?.name}
            </div>
            <div
              style="font-size:62%;
			text-align:right;
		      margin-top:5px;"
            >
              {user.info?.email}
            </div>
          </div>
          <div style="display:flex;font-size:85%;flex-wrap:wrap;overflow:hidden;">
            <div style="min-width:250px;">
              {false &&
                `${
                  fromStart == 0
                    ? `${
                        hasCheckIn(stay)
                          ? "CHECK IN REALIZADO"
                          : "PENDIENTE CHECKIN"
                      }`
                    : toEnd == 0
                    ? `${hasCheckOut(stay) ? "[OK] " : ""}CHECKOUT HOY`
                    : stay
                    ? "HOSPEDADO"
                    : ""
                }   ${stay ? `[ ${stay.info.name} ]` : ""} `}
            </div>
            {false && total !== 0 && (
              <div style="flex:1;text-align:right;min-width:250px;">
                <div>{`${
                  total == 0 ? "NO DEBE" : total > 0 ? "DEBE " : "SE LE DEBE "
                }`}</div>
                <div>
                  {`${currency(Math.abs(total), { precision: 0 }).format()}`}
                </div>
              </div>
            )}
          </div>
          <div style="font-size:90%;">
            {user.info.name &&
            user.info.surname &&
            user.info.country &&
            user.info.document
              ? ""
              : " ⚠️  Falta informacion requerida"}
          </div>
          {/* <div>{`${data.info.cell}`}</div> */}
          {/* <button>CALL</button> */}
        </div>
      )}
    </>
  );
}
