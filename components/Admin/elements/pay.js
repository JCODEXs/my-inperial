import { useAssets, addElement, deleteAdq } from 'vStore/assets';
import { useState, useEffect } from 'preact/hooks';
import { useSelected } from 'vStore/selected';
import moment from 'moment';
import 'moment/locale/es';
import { useTotals } from 'vStore/totals';
moment.locale('es');
import QtySelect from '../qtySelect';
export default function Adq({}) {
  const [buy, setBuy] = useState(true);
  const [selectedItem, setSelectedItem] = useState();
  const [qty, setQty] = useState(1);
  const [value, setValue] = useState(0);
  const { selected: userID } = useSelected();
  // const { selected: user } = useSelected();
  const { shop, users } = useAssets();
  const { total } = useTotals();
  var totalPagos = 0;
  const user = users.find((user) => user._id == userID);
  return (
    <div style="max-height:100%;display:flex;flex-direction:column;overflow:hidden;">
      {/* {selectedItem?._id} */}
      <div
        style={`display:flex;flex-direction:column;gap:5px;padding:5px;border-radius:0px;`}
      >
        <b>AÑADIR PAGO</b>
        {/* <div style="display:flex;gap:5px;"> */}
        {/*   <button */}
        {/*     class={buy && 'tab_selected'} */}
        {/*     style="flex:1" */}
        {/*     onClick={() => setBuy(true)} */}
        {/*   > */}
        {/*     + COMPRA */}
        {/*   </button> */}
        {/*   <button */}
        {/*     class={!buy && 'tab_selected'} */}
        {/*     style="flex:2;" */}
        {/*     onClick={() => setBuy(false)} */}
        {/*   > */}
        {/*     + PAGO */}
        {/*   </button> */}
        {/* </div> */}
        <div style="display:flex;gap:5px;">
          {/* <div style="display:flex;"> */}
          <select
            selected={selectedItem && JSON.stringify(selectedItem)}
            onChange={(e) => {
              const selected =
                e.target.value && JSON.parse(e.target.value).info
                  ? JSON.parse(e.target.value)
                  : 'lol';
              setSelectedItem(selected);
              selected?.type?.includes('total') && setValue(total);
            }}
            style="min-width:50%;flex:2;"
          >
            <option value={JSON.stringify({ mamahuev: 'huev' })}>
              Selecciona un pago
            </option>
            <option
              value={JSON.stringify({
                type: 'value,total',
                info: { name: 'Aporte valor', price: total },
              })}
            >
              {`TOTAL DEUDA ACTUAL $${total}`}{' '}
            </option>
            <option
              value={JSON.stringify({
                type: 'value',
                info: { name: 'Aporte valor', price: undefined },
              })}
            >
              {' '}
              APORTE VALOR{' '}
            </option>
            {shop?.map((value) => (
              <option
                value={JSON.stringify(value)}
              >{`${value.info.name} $${value.info.price}`}</option>
            ))}
          </select>
          {selectedItem?.info ? (
            selectedItem?.type?.includes('value') ? (
              <input
                value={value}
                style="text-align:right;"
                onChange={(e) => setValue(e.target.value)}
                type="numeric"
                placeholder="$????????"
              />
            ) : (
              <QtySelect
                defaultValue={qty}
                onChange={(value) => setQty(value)}
              />
            )
          ) : (
            <></>
          )}
          {/* </div> */}
          {/* <button>OK</button> */}
        </div>
        <div style="justify-content:right;display:flex;align-items:center;">
          {selectedItem?.info && (
            <b style="flex:1;">{`SUBTOTAL $${
              selectedItem?.type?.includes('value')
                ? value
                : qty * selectedItem?.info.price
            }`}</b>
          )}
          <button
            style="float:right;"
            disabled={!selectedItem?.info}
            class={!selectedItem?.info && 'disabled'}
            onClick={() => {
              // alert(selectedItem._id);
              // alert(qty);
              const options = {};
              selectedItem?.type?.includes('value')
                ? (options.value = value)
                : (options.qty = qty);

              addElement('pay', user._id, {
                ref: selectedItem._id,
                info: selectedItem.info,
                ...options,
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
      <div style="overflow-y:auto;">
        {user.pay && [...user.pay].reverse().map((value) => {})}
      </div>
    </div>
  );
}
export function payElem(pay, edit) {
  // const item = assets.shop.find((item) => item._id == value.ref);}
  const [changes, setChanges] = useState({ ...pay });
  const { info, qty } = pay;
  const subtotal = changes?.qty * pay.info.price;
  return (
    <div style="display:flex;">
      Fuck
      <div style="width:80px;">PAGO</div>
      <div style="flex:1;">{info.name}</div>
      <div style="text-align:right;">
        {edit ? (
          pay.value ? (
            <input
              style="text-align:right;"
              onChange={(e) => setValue(e.target.value)}
              type="numeric"
              placeholder={`$${pay.value}`}
            />
          ) : (
            <QtySelect
              defaultValue={qty}
              onChange={(value) => {
                // setChanges((prev) => {
                //   prev.qty = value;
                //   return prev;
                // });
              }}
            />
          )
        ) : (
          !pay.value && <>{`X ${qty}`}</>
        )}
      </div>
      {!edit && (
        <div style="width:100px;text-align:right;">{`$ ${
          pay.value ? pay.value : subtotal
        }`}</div>
      )}
    </div>
  );
}
