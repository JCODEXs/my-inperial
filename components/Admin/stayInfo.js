import moment from "moment";
import "moment/locale/es";
moment.locale("es");
import {
  useAssets,
  // deleteStay,
  // getAdyacent,
  // hasCheckIn,
  // hasCheckOut,
} from "vStore/assets";
import { useOverlays, setCheckoutStay } from "vStore/overlays";
import { useTime } from "vStore/time";
export default function StayInfo({ stay, resumed = false }) {
  const { time } = useTime();
  const fromStart = moment(stay.range[0]).diff(
    time.format("YYYY-MM-DD"),
    "days"
  );
  const toEnd = moment(stay.range[1]).diff(time.format("YYYY-MM-DD"), "days");
  const days = moment(stay.range[1]).diff(moment(stay.range[0]), "days");
  const { users } = useAssets();
  const { checkout } = useOverlays();
  const { prev, next } = getAdyacent(stay);
  const ext = prev?.ref == stay.ref;
  var perc = 0;

  const isActual = fromStart < 0 && toEnd > 0;
  isActual
    ? (perc = Math.abs(Math.min(fromStart / days), 1))
    : fromStart > 0
    ? (perc = 0)
    : (perc = 1);
  // total = stay.price * days

  const canCheckout = isActual && (stay.checkin || prev);
  return (
    <div style="display:flex;flex-direction:column;gap:5px;overflow:hidden;align-items:stretch;">
      {/* {ext && 'ext'} */}
      {/* {next && 'next'} */}
      {/* {prev && 'prev'} */}
      <div style="overflow:hidden;height:6px;background:rgb(5,5,5); border-radius:2px; ">
        <div
          style={`min-height:100%;border-radius:2px;width:${
            fromStart < 0 ? perc * 100 : 0
          }%;background:${hasCheckIn(stay) ? "limegreen" : "salmon"};`}
        ></div>
      </div>
      <div style="gap:10px;display:flex;">
        <b style="">{stay.info.name}</b>
        <div style="flex:1;"> {`${stay.origin}`}</div>
        <div>
          <div style="text-align:right;">
            {stay.checkout ? (
              <div style="">
                <b style="color:limegreen;">CHECK OUT REALIZADO</b>
                <div style="font-size:80%;">{`por:${
                  users.find((user) => user._id == stay.checkout.creation.by)
                    .userInfo.name
                }`}</div>
              </div>
            ) : isActual ? (
              false && hasCheckIn(stay) ? (
                <b style="color:palegoldenrod;">ACTIVO</b>
              ) : (
                <button
                  onClick={() => {
                    setCheckoutStay(stay, true);
                    checkout.ref.current.open();
                  }}
                  style="color:salmon;"
                >
                  {"⚠️ CHECKIN NO REALIZADO"}
                </button>
              )
            ) : fromStart > 0 ? (
              <b>
                {`INICIA ${moment(stay.range[0])
                  .add(12, "hours")
                  .fromNow()
                  .toUpperCase()}
                `}
              </b>
            ) : toEnd == 0 && canCheckout ? (
              <b style="color:salmon;">
                {next ? "CAMBIO DE HABITACION HOY!" : "CHECK OUT HOY!"}
              </b>
            ) : fromStart == 0 ? (
              stay.checkin ? (
                <b style="color:limegreen;">CHECK IN REALIZADO</b>
              ) : (
                <b style="color:salmon;"> CHECK IN HOY!!</b>
              )
            ) : canCheckout ? (
              stay.checkout ? (
                "FINALIZADO"
              ) : (
                "CHECKOUT PENDIENTE"
              )
            ) : stay.checkin ? (
              next ? (
                <b style="color:palegoldenrod;">{"EXTENDIDO"}</b>
              ) : (
                <button
                  onClick={() => {
                    setCheckoutStay(stay, false);
                    checkout.ref.current.open();
                  }}
                  style="color:salmon;"
                >
                  {"⚠️ CHECKOUT NO REALIZADO"}
                </button>
              )
            ) : (
              <button
                onClick={() => {
                  setCheckoutStay(stay, true);
                  checkout.ref.current.open();
                }}
                style="color:salmon;"
              >
                {"⚠️ CHECKIN NO REALIZADO"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div>{stay.info.isPrivate ? "PRIVADA" : "COMPARTIDA"}</div>
      {!resumed && (
        <div style="display:flex;gap:5px;justify-content:space-between;align-items:center;">
          <div>
            <b>{fromStart > 0 ? "INICIA" : "INICIÓ"}</b>
            <div>{stay.range[0]}</div>
            <b>
              {moment(stay.range[0]).add(12, "hours").fromNow()}
              {/* {!fromStart */}
              {/*   ? 'Desde hoy' */}
              {/*   : fromStart == -1 */}
              {/*   ? 'Desde ayer' */}
              {/*   : 'Hace ' + fromStart + ' noches'} */}
            </b>
          </div>
          <div>
            <b>{toEnd > 0 ? "FINALIZA" : "FINALIZÓ"}</b>
            <div>{stay.range[1]}</div>
            <b>
              {moment(stay.range[1]).add(12, "hours").fromNow()}
              {/* {!toEnd
              ? 'No quedan noches '
              : toEnd == 1
              ? 'Hasta mañana'
              : 'Quedan ' + toEnd + ' noches'}*/}
            </b>
          </div>

          <div style="text-align:right;float: right;">
            <b> {`$${stay.price}/noche`}</b>
            <div> {days + " noches"}</div>
            <b>{`$${days * stay.price * perc} ${
              perc < 1 ? `de $${days * stay.price}` : ""
            }`}</b>
          </div>
        </div>
      )}
      {`Viene de ${stay.from} y va para ${stay.to}`}
      {prev && (
        <b
          style="z-index:9000;line-height:15px;color:palegoldenrod;position:absolute;bottom:0px;left:62%;
	      transform:translateX(0%);"
        >
          {!ext ? `▲\nCAMBIO` : `▲\nEXTIENDE`}
        </b>
      )}
    </div>
  );
}
