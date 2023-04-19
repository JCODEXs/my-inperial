import { useTotals } from "vStore/totals";
import currency from "currency.js";
import {
  updateElement,
  makeCheckout,
  makeCheckin,
  hasCheckIn,
} from "vStore/assets";
import { useJasmin } from "vStore/jasmin";
import { useState } from "preact/hooks";
import moment from "moment";

export default function Resume({ data }) {
  // const { totalCompras, totalPagos, totalEstadia, subtotal, total } =
  //   useTotals();
  // const activeStay = user.stay?.find((stay) => {
  //   const fromStart = moment(stay.range[0]).diff(
  //     moment().startOf('day'),
  //     'days'
  //   );
  //   const toEnd = moment(stay.range[1]).diff(moment().startOf('day'), 'days');
  //   console.log('fromStart: ', fromStart, ' - toEnd: ', toEnd);
  //   return fromStart <= 0 && toEnd >= 0;
  // });
  // const actionDisabled =
  //   !activeStay ||
  //   (hasCheckIn(activeStay) &&
  //     moment(activeStay.range[0]).diff(moment().startOf('day'), 'days') < 1);
  return (
    <div
      style="
filter: drop-shadow(0 0 0.75rem black);
	    display:flex;flex-wrap:wrap; gap:5px;"
    >
      <div
        style={`flex:1;display:flex;;padding:5px;border-radius:5px;border:solid 2px rgba(60,60,60,0.6);`}
      >
        <div style="flex:1">GANANCIAS</div>
        <div style="width:100px;text-align:right;">
          {currency(data?.earnings.value, { precision: 0 }).format()}
        </div>
        {/* {data.adq} */}
      </div>
      <div
        style={`flex:1;display:flex;padding:5px;border-radius:5px;border:solid 2px rgba(60,60,60,0.6);`}
      >
        <div style="flex:1">TRABAJADO</div>
        <div style="width:100px;text-align:right;">
          {(data?.workTime.value / 3600).toFixed(2)} h
        </div>
        {/* {data.adq} */}
      </div>
      {/* <div style="flex:1;display:flex;background:black;padding:5px;border-radius:5px;border:solid 2px rgba(60,60,60,0.6);"> */}
      {/*   <div style="flex:1">GASTOS</div> */}
      {/*   <div style="width:100px;text-align:right;"> */}
      {/*     {currency(subtotal, { precision: 0 }).format()} */}
      {/*   </div> */}
      {/*   {/1* {data.adq} *1/} */}
      {/* </div> */}
      <div
        style={`flex:1;display:flex;padding:5px;border-radius:5px;border:solid 2px rgba(60,60,60,0.6);`}
      >
        <div style="flex:1">POR HORA</div>
        <div style="width:100px;text-align:right;">
          {currency(data?.averageEarningPerHour.value, {
            precision: 0,
          }).format()}
        </div>
        {/* {data.adq} */}
      </div>
      {/* No hay deudas a la fecha, puedes realizar el checkOut */}
      {/* <div */}
      {/*   style={`flex:1;display:flex;background:black;padding:5px;border-radius:5px;border:solid 2px ${ */}
      {/*     total <= 0 ? 'limegreen' : 'crimson' */}
      {/*   };`} */}
      {/* > */}
      {/*   <div style="flex:1"> */}
      {/*     {total < 0 ? 'A FAVOR' : total == 0 ? 'META' : 'DEBE'} */}
      {/*   </div> */}
      {/*   <div style="width:100px;text-align:right;"> */}
      {/*     {currency(Math.abs(total), { precision: 0 }).format()} */}
      {/*   </div> */}
      {/*   {/1* {data.adq} *1/} */}
      {/* </div> */}
      {/* <button style="flex:1;min-width:100px;">DESCARGAR REPORTE</button> */}
      {/* <button */}
      {/*   disabled={actionDisabled} */}
      {/*   class={actionDisabled && 'disabled'} */}
      {/*   style="flex:1;min-width:100px;" */}
      {/*   onClick={() => { */}
      {/*     activeStay */}
      {/*       ? hasCheckIn(activeStay) */}
      {/*         ? total > 0 */}
      {/*           ? confirm( */}
      {/*               'EL USUARIO DEBE AUN\nDeseas realizar CHECKOUT de todas maneras?' */}
      {/*             ) && makeCheckout(user._id, activeStay._id, total) */}
      {/*           : makeCheckout(user._id, activeStay._id, total) */}
      {/*         : makeCheckin(user._id, activeStay._id) */}
      {/*       : alert( */}
      {/*           'El huesped NO tiene una estadia ACTIVA para hacer checkout' */}
      {/*         ); */}
      {/*   }} */}
      {/* > */}
      {/*   {activeStay && hasCheckIn(activeStay) ? 'CHECK OUT' : 'CHECK IN'} */}
      {/* </button> */}
    </div>
  );
}
