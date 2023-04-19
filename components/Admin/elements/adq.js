import { useAssets, addElement, deleteAdq } from 'vStore/assets';
import { useState, useEffect } from 'preact/hooks';
import { useSelected } from 'vStore/selected';
import { setField } from 'vStore/totals';
import QtySelect from '../qtySelect';
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
  var total = 0;
  var totalCompras = 0;
  var totalPagos = 0;
  const user = users.find((user) => user._id == userID);
  return (
    <div style="max-height:100%;display:flex;flex-direction:column;overflow:hidden;">
      {/* {selectedItem?._id} */}
      <div
        style={`display:flex;flex-direction:column;gap:5px;padding:5px;border-radius:0px;`}
      >
        <b style="">AÑADIR COMPRA</b>
        <div style="display:flex;gap:5px;">
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
          <QtySelect onChange={setQty} />
          {/* </div> */}
          {/* <button>OK</button> */}
        </div>
        <div style="display:flex;">
          <b style="flex:1;">{`SUBTOTAL $${qty * selectedItem?.info.price}`}</b>
          <button
            disabled={!selectedItem}
            onClick={() => {
              // alert(selectedItem._id);
              // alert(qty);
              if (confirm('El usuario paga esta compra AHORA?')) {
                addElement('pay', user._id, {
                  ref: selectedItem._id,
                  info: selectedItem.info,
                  qty,
                });
              }
              addElement('adq', user._id, {
                ref: selectedItem._id,
                info: selectedItem.info,
                qty,
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
    </div>
  );
}

export function adqElem(adq, edit = false) {
  const [changes, setChanges] = useState({ ...adq });
  const subtotal = changes?.qty * adq.info?.price;
  // if (value.isBuy) {
  //   totalCompras += subtotal;
  // } else {
  //   totalPagos += subtotal;
  // }
  // total = totalCompras - totalPagos;
  // const creator = users.find((user) => user._id == value.creation.by);
  return (
    <div style="display:flex;">
      <div style="width:80px;">{'COMPRA '}</div>
      <div style="flex:1;">{adq.info?.name}</div>
      <div style="text-align:right;">
        {edit ? (
          <QtySelect
            defaultValue={adq.qty}
            onChange={(value) => {
              // setChanges((prev) => {
              //   prev.qty = value;
              //   return prev;
              // });
            }}
          />
        ) : (
          <>{`X ${adq.qty}`}</>
        )}
      </div>
      <div style="width:100px;text-align:right;">{`$ ${subtotal}`}</div>
    </div>
  );
}
