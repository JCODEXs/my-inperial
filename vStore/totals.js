import { proxy, useSnapshot, subscribe } from "valtio";
import { derive } from "valtio/utils";
// import { getAdyacent, hasCheckIn } from 'vStore/assets';
// import moment from 'moment';
const state = proxy({
  totalCompras: 0,
  totalPagos: 0,
  totalEstadia: 0,
});
const derived = {
  subtotal: (get) => {
    return get(state).totalCompras + get(state).totalEstadia;
  },
  total: (get) => {
    return (
      get(state).totalCompras + get(state).totalEstadia - get(state).totalPagos
    );
  },
};
derive(derived, {
  proxy: state,
});
export default state;
export const setField = (field, value) => {
  state[field] = value;
};
export const calcTotals = (user) => {
  var totalCompras = 0;
  var totalEstadia = 0;
  var totalPagos = 0;
  user?.adq?.forEach((value) => {
    // const item = assets.shop.find((item) => item._id == value.ref);
    const subtotal = parseFloat(value.value) || value.qty * value.info.price;
    totalCompras += subtotal;
  });
  user.pay?.forEach((value) => {
    // const item = assets.shop.find((item) => item._id == value.ref);
    const subtotal = value.qty
      ? value.qty * value.info.price
      : parseFloat(value.value);
    totalPagos += subtotal;
  });
  // user.stay?.forEach((stay) => {
  //   const fromStart = moment(stay.range[0]).diff(
  //     moment().format('YYYY-MM-DD'),
  //     'days'
  //   );
  //   const toEnd = moment(stay.range[1]).diff(
  //     moment().format('YYYY-MM-DD'),
  //     'days'
  //   );
  //   if (hasCheckIn(stay)) {
  //     if (fromStart < 0 && toEnd > 0) {
  //       // if (stay.checkin) {
  //       const days = moment().diff(moment(stay.range[0]), 'days');
  //       totalEstadia += stay.price * days;
  //       // }
  //     } else if (toEnd <= 0) {
  //       const days = moment(stay.range[1]).diff(moment(stay.range[0]), 'days');
  //       totalEstadia += stay.price * days;
  //     } else {
  //     }
  //   }
  // });
  return { totalCompras, totalEstadia, totalPagos };
};
export const useTotals = () => useSnapshot(state);
