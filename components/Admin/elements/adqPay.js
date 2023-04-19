import { useAssets, addElement, deleteAdq } from 'vStore/assets';
import { useTotals } from 'vStore/totals';
import { useState, useEffect } from 'preact/hooks';
import { useSelected } from 'vStore/selected';
import { setField } from 'vStore/totals';
import QtySelect from '../qtySelect';
import moment from 'moment';
import 'moment/locale/es';
import currency from 'currency.js';
moment.locale('es');
export default function AdqPay({ type }) {
  const [selectedItem, setSelectedItem] = useState();
  const [qty, setQty] = useState(1);
  const [value, setValue] = useState(0);
  const { selected: userID } = useSelected();
  // const { selected: user } = useSelected();
  const { shop, users } = useAssets();
  const { total } = useTotals();
  const user = users.find((user) => user._id == userID);
  const disabled = selectedItem?.type == 'value' ? !value : !selectedItem?.info;
  return (
    <div style="max-height:100%;display:flex;flex-direction:column;overflow:hidden;">
      {/* {selectedItem?._id} */}
      <div
        style={`display:flex;flex-direction:column;gap:10px;padding:5px;border-radius:0px;`}
      >
        <div>
          <b style="">AÑADIR</b>
          {disabled && <div style="float:right;">Falta información</div>}
        </div>
        <div style="min-height:35px;align-items:center;display:flex;flex-wrap:wrap;gap:5px;max-width:100%;">
          {/* <div style="display:flex;"> */}
          <select
            onChange={(e) => {
              // console.log(e.target.value);
              const selected =
                e.target.value && JSON.parse(e.target.value).info
                  ? JSON.parse(e.target.value)
                  : 'lol';
              setSelectedItem(selected);
              selected?.type?.includes('total') && setValue(total);
            }}
            style="min-width:50%;flex:2;"
          >
            <option value={JSON.stringify({})}>Selecciona un elemento</option>
            {type == 'pay' && (
              <option
                value={JSON.stringify({
                  type: 'value,total',
                  info: { name: 'Aporte valor', price: total },
                })}
              >
                {`TOTAL DEUDA ACTUAL $${total}`}{' '}
              </option>
            )}
            <option
              value={JSON.stringify({
                type: 'value',
                info: { name: 'Aporte valor', price: undefined },
              })}
            >
              {`${type == 'adq' ? 'COMPRA' : 'APORTE'} VALOR `}
            </option>
            {shop?.map((value) => (
              <option
                value={JSON.stringify(value)}
              >{`${value.info.name} $${value.info.price}`}</option>
            ))}
          </select>
          {selectedItem?.info && !selectedItem?.type?.includes('total') ? (
            selectedItem?.type?.includes('value') ? (
              <input
                value={value}
                style="text-align:right;flex:1;"
                onChange={(e) => setValue(e.target.value)}
                type="number"
                step="100"
                min="100"
                placeholder="$????????"
              />
            ) : (
              <QtySelect
                isFloat={selectedItem?.info.name == 'Lavanderia Kilo'}
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
            class={disabled && 'disabled'}
            disabled={disabled}
            onClick={() => {
              // alert(selectedItem._id);
              // alert(qty);
              const options = {};
              selectedItem?.type?.includes('value')
                ? (options.value = value)
                : (options.qty = qty);
              // alert(selectedItem._id);
              // alert(qty);

              if (
                type == 'adq' &&
                confirm('El usuario paga esta compra AHORA?')
              ) {
                addElement('pay', user._id, {
                  ref: selectedItem._id,
                  info: selectedItem.info,
                  qty,
                });
              }
              addElement(type, user._id, {
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
    </div>
  );
}
export function adqPayElem(elem, edit) {
  // const item = assets.shop.find((item) => item._id == value.ref);}
  const [changes, setChanges] = useState({ ...elem });
  const { info, qty } = elem;
  // setChanges((prev) => {
  //   prev.qty = value;
  //   return prev;
  // });
  const subtotal = parseFloat(elem.qty) * parseFloat(elem.info.price);
  return (
    <div style="display:flex;">
      {/* <div style="width:80px;">PAGO</div> */}
      <div style="flex:1;">{info.name}</div>
      <div style="text-align:right;">
        {edit ? (
          elem.value ? (
            <input
              style="text-align:right;"
              onChange={(e) => setValue(e.target.value)}
              type="number"
              placeholder={`$${elem.value}`}
            />
          ) : (
            <QtySelect defaultValue={qty} onChange={(value) => {}} />
          )
        ) : (
          !elem.value && <>{`X ${qty}`}</>
        )}
      </div>
      {!edit && (
        <div style="width:100px;text-align:right;">
          {currency(elem.value ? parseFloat(elem.value) : subtotal, {
            precision: 0,
          }).format()}
        </div>
      )}
    </div>
  );
}
