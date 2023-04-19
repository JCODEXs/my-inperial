import { useTotals } from "vStore/totals";
import currency from "currency.js";
import // updateElement,
// makeCheckout,
// makeCheckin,
// hasCheckIn,
"vStore/assets";
import moment from "moment";
import { sections } from "vStore/sections";
export default function Resume({ user }) {
  const { totalCompras, totalPagos, totalEstadia, subtotal, total } =
    useTotals();
  const activeStay = user.stay?.find((stay) => {
    const fromStart = moment(stay.range[0]).diff(
      moment().startOf("day"),
      "days"
    );
    const toEnd = moment(stay.range[1]).diff(moment().startOf("day"), "days");
    console.log("fromStart: ", fromStart, " - toEnd: ", toEnd);
    return fromStart <= 0 && toEnd >= 0;
  });
  // const actionDisabled =
  //   !activeStay ||
  //   (
  //       hasCheckIn(activeStay)
  //         &&
  //     moment(activeStay.range[0]).diff(moment().startOf("day"), "days") < 1);
  return (
    <div style="display:flex;flex-wrap:wrap; gap:5px;">
      <div
        style={`flex:1;display:flex;background:${sections.stay.background};padding:5px;border-radius:5px;border:solid 2px rgba(60,60,60,0.6);`}
      >
        <div style="flex:1">ESTADIA</div>
        <div style="width:100px;text-align:right;">
          {currency(totalEstadia, { precision: 0 }).format()}
        </div>
        {/* {data.adq} */}
      </div>
      <div
        style={`flex:1;display:flex;background:${sections.adq.background};padding:5px;border-radius:5px;border:solid 2px rgba(60,60,60,0.6);`}
      >
        <div style="flex:1">COMPRAS</div>
        <div style="width:100px;text-align:right;">
          {currency(totalCompras, { precision: 0 }).format()}
        </div>
        {/* {data.adq} */}
      </div>
      <div style="flex:1;display:flex;background:black;padding:5px;border-radius:5px;border:solid 2px rgba(60,60,60,0.6);">
        <div style="flex:1">GASTOS</div>
        <div style="width:100px;text-align:right;">
          {currency(subtotal, { precision: 0 }).format()}
        </div>
        {/* {data.adq} */}
      </div>
      <div
        style={`flex:1;display:flex;background:${sections.pay.background};padding:5px;border-radius:5px;border:solid 2px rgba(60,60,60,0.6);`}
      >
        <div style="flex:1">PAGOS</div>
        <div style="width:100px;text-align:right;">
          {currency(totalPagos, { precision: 0 }).format()}
        </div>
        {/* {data.adq} */}
      </div>
      {/* No hay deudas a la fecha, puedes realizar el checkOut */}
      <div
        style={`flex:1;display:flex;background:black;padding:5px;border-radius:5px;border:solid 2px ${
          total <= 0 ? "limegreen" : "crimson"
        };`}
      >
        <div style="flex:1">
          {total < 0 ? "A FAVOR" : total == 0 ? "OK" : "DEBE"}
        </div>
        <div style="width:100px;text-align:right;">
          {currency(Math.abs(total), { precision: 0 }).format()}
        </div>
        {/* {data.adq} */}
      </div>
      <button
        disabled={actionDisabled}
        class={actionDisabled && "disabled"}
        style="flex:1;min-width:100px;"
        onClick={() => {
          false && activeStay
            ? hasCheckIn(activeStay)
              ? total > 0
                ? confirm(
                    "EL USUARIO DEBE AUN\nDeseas realizar CHECKOUT de todas maneras?"
                  ) && makeCheckout(user._id, activeStay._id, total)
                : makeCheckout(user._id, activeStay._id, total)
              : makeCheckin(user._id, activeStay._id)
            : alert(
                "El huesped NO tiene una estadia ACTIVA para hacer checkout"
              );
        }}
      ></button>
    </div>
  );
}
// {activeStay && hasCheckIn(activeStay) ? 'CHECK OUT' : 'CHECK IN'}
