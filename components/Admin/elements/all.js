import { useAssets, addAdq, deleteAdq } from 'vStore/assets';
import { useState, useEffect } from 'preact/hooks';
import { useSelected } from 'vStore/selected';
import { setField } from 'vStore/totals';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
export default function Adq({}) {
  const [buy, setBuy] = useState(true);
  const [selectedItem, setSelectedItem] = useState();
  const [qty, setQty] = useState(1);
  const { selected: userID } = useSelected();
  // const { selected: user } = useSelected();
  const { shop, users } = useAssets();
  const user = users.find((user) => user._id == userID);
  return (
    <div style="max-height:100%;display:flex;flex-direction:column;overflow:hidden;">
      {/* {selectedItem?._id} */}
      <div style="display:flex;gap:5px;">
        <div
          style={`display:flex;flex-direction:column;gap:5px;
	      background:lavender;
	      padding:5px;border-radius:0px;`}
        >
          {/* <div style="display:flex;"> */}
          <select
            onChange={(e) => {
              // console.log(e.target.value);
              setSelectedItem(
                e.target.value ? JSON.parse(e.target.value) : undefined
              );
            }}
            style="min-width:50%;flex:2;"
          >
            <option value={undefined}>Selecciona un producto</option>
            {shop?.map((value) => (
              <option
                value={JSON.stringify(value)}
              >{`${value.info.name} $${value.info.price}`}</option>
            ))}
          </select>
          <div style="display:flex;gap:5px;">
            <button
              style="max-width:30px;"
              onClick={() => {
                setQty((prev) => Math.max(1, prev - 1));
              }}
            >
              -
            </button>
            <input
              type="number"
              value={qty}
              min="0"
              onChange={(e) => {
                setQty(parseInt(e.target.value));
              }}
              style="max-width:30px;"
            ></input>
            <button
              style="max-width:30px;"
              onClick={() => {
                setQty((prev) => prev + 1);
              }}
            >
              +
            </button>
          </div>
          {/* </div> */}
          {/* <button>OK</button> */}
        </div>
        <div style="display:flex;">
          <b style="flex:1;mix-blend-mode:difference;">{`SUBTOTAL $${'3500'}`}</b>

          <button
            disabled={!selectedItem}
            onClick={() => {
              // alert(selectedItem._id);
              // alert(qty);
              addAdq(user._id, {
                ref: selectedItem._id,
                info: selectedItem.info,
                qty,
                isBuy: buy,
              });
            }}
          >
            AGREGAR
          </button>
        </div>
        {/* <pre>{JSON.stringify(user, null, 2)} */}
      </div>
      {/* <div style="flex:1;text-align:right;">{`X 10 dias`}</div> */}
      {/* <div style="width:100px;text-align:right;">{`$ 160000`}</div> */}
      {/* <div style="overflow-y:auto;"> */}
      {/*   {user.adq && */}
      {/*     [...user.adq].reverse().map((value) => { */}
      {/*       // const item = assets.shop.find((item) => item._id == value.ref); */}
      {/*       const subtotal = value.qty * value.info.price; */}
      {/*       if (value.isBuy) { */}
      {/*         totalCompras += subtotal; */}
      {/*       } else { */}
      {/*         totalPagos += subtotal; */}
      {/*       } */}
      {/*       total = totalCompras - totalPagos; */}
      {/*       const creator = users.find((user) => user._id == value.creation.by); */}
      {/*       return ( */}
      {/*         <div style={`background:${value.isBuy ? 'black' : '#000024'};`}> */}
      {/*           <AssetDisplay asset={value} section={'adq'}> */}
      {/*             <div style="display:flex;"> */}
      {/*               <div style="width:80px;"> */}
      {/*                 {value.isBuy ? 'COMPRA ' : 'PAGO '} */}
      {/*               </div> */}
      {/*               <div style="">{value.info.name}</div> */}
      {/*               <div style="flex:1;text-align:right;">{`X ${value.qty}`}</div> */}
      {/*               <div style="width:100px;text-align:right;"> */}
      {/*                 {`$ ${subtotal}`} */}
      {/*               </div> */}
      {/*             </div> */}
      {/*           </AssetDisplay> */}
      {/*         </div> */}
      {/*       ); */}
      {/*     })} */}
      {/* </div> */}
    </div>
  );
}
