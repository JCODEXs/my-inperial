import { useAssets, addElement } from 'vStore/assets';
import { useState, useLayoutEffect } from 'preact/hooks';
import moment from 'moment';
import StayInfo from '../stayInfo';
import ValidationInput from 'components/validationInput';
export default function Stay({ user }) {
  const [range, setRange] = useState([
    moment().format('YYYY-MM-DD'),
    moment().add(1, 'days').format('YYYY-MM-DD'),
  ]);
  const { rooms } = useAssets();
  const options = rooms?.map((room) => {
    const intersecting = room.stays?.filter((stay) => {
      return !(stay.range[0] >= range[1] || stay.range[1] <= range[0]);
    });
    // intersecting.length;
    return { room, available: room.info.locations - intersecting?.length };
  });
  const [selectedItem, setSelectedItem] = useState();
  const [origin, setOrigin] = useState();
  const [price, setPrice] = useState();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const refactorName = (inputText) => {
    // inputText = inputText.replace(/  +/g, ' ');
    // inputText = inputText.replace(/[^a-zA-Z ]+/, '');
    var splitStr = inputText.toLowerCase().split(' ');
    splitStr = splitStr.slice(0, 5);
    for (var i = 0; i < splitStr.length; i++) {
      if (splitStr[i].length > 15) {
        splitStr[i] = splitStr[i].slice(0, 10);
      }
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  };
  useLayoutEffect(() => {
    user.stay?.find(
      (stay) =>
        (stay.range[0] < range[1] && stay.range[0] > range[0]) ||
        (stay.range[1] < range[1] && stay.range[1] > range[0])
    ) && alert('El huesped ya tiene estadia que se cruza en estas fechas');
  }, [range]);
  useLayoutEffect(() => {
    selectedItem && setPrice(parseInt(selectedItem.info.defaultPrice));
    // alert(JSON.stringify(selectedItem));
  }, [selectedItem]);
  const days = moment(range[1]).diff(moment(range[0]), 'days');
  const disabled = !(
    (selectedItem && range[0] && range[1] && origin && price)
    //&&
    // from.length > 3 &&
    // to.length > 3
  );
  return (
    <div style="padding:5px;max-height:100%;display:flex;flex-direction:column;overflow:hidden;gap:5px;">
      <div>
        <b>AÑADIR ESTADIA</b>
        {disabled && <div style="float:right;">Falta información</div>}
      </div>
      <div style="display:flex;gap:5px;">
        <div style="flex:1;">
          <div>HABITACION</div>
          <select
            style="width:100%;"
            onChange={(e) => {
              // console.log(e.target.value);
              setSelectedItem(
                e.target.value ? JSON.parse(e.target.value).room : undefined
              );
            }}
          >
            <option value={undefined}>Selecciona Habitacion</option>
            {options.map((option) => {
              return (
                <option
                  style={`color:black;background:${
                    option.available > 0 ? '#76ff7a' : '#F08080'
                  }`}
                  value={JSON.stringify(option)}
                >
                  <div> {option.room.info.name}</div>
                  <div style="text-align:right;">
                    {option.available > 0
                      ? ` (${option.available} Disponibles)`
                      : ' (No Disponible)'}
                  </div>
                </option>
              );
            })}
          </select>
        </div>
        <div style="flex:1;">
          <div>ORIGEN</div>
          <select
            style="width:100%;"
            onChange={(e) => {
              // console.log(e.target.value);
              setOrigin(e.target.value ? e.target.value : undefined);
            }}
          >
            <option value={undefined}>Selecciona un Origen</option>
            <option value={'Origen1'}>Origen1</option>
            <option value={'Origen2'}>Origen2</option>
            <option value={'Origen3'}>Origen3</option>
          </select>
        </div>
      </div>
      <div style="display:flex;gap:5px;">
        <div style="flex:1;">
          <div>DESDE</div>
          <input
            style="width:98%;"
            value={range[0]}
            onChange={(e) => {
              setRange((prev) => [
                e.target.value,
                moment(prev[1], 'YYYY-MM-DD').isAfter(e.target.value)
                  ? prev[1]
                  : moment(e.target.value).add(1, 'days').format('YYYY-MM-DD'),
              ]);
            }}
            type="date"
          />
        </div>
        <div style="flex:1;">
          <div>HASTA</div>
          <input
            style="width:98%;"
            value={range[1]}
            onChange={(e) => {
              setRange((prev) => [
                moment(prev[0], 'YYYY-MM-DD').isBefore(e.target.value)
                  ? prev[0]
                  : moment(e.target.value).add(-1, 'days').format('YYYY-MM-DD'),
                e.target.value,
              ]);
            }}
            type="date"
          />
        </div>
      </div>

      {/* <div style="display:flex;gap:5px;align-items:center;"> */}
      {/*   <div style="flex:1;display:flex;flex-direction:column;"> */}
      {/*     <div>VIENE DE</div> */}
      {/*     <input */}
      {/*       value={from} */}
      {/*       onChange={(e) => { */}
      {/*         const refactored = refactorName(e.target.value); */}
      {/*         setFrom(refactored); */}
      {/*       }} */}
      {/*     /> */}
      {/*   </div> */}
      {/*   <div style="flex:1;display:flex;flex-direction:column;"> */}
      {/*     <div>VA PARA</div> */}
      {/*     <input */}
      {/*       value={to} */}
      {/*       onChange={(e) => { */}
      {/*         const refactored = refactorName(e.target.value); */}
      {/*         setTo(refactored); */}
      {/*       }} */}
      {/*     /> */}
      {/*   </div> */}
      {/* </div> */}
      <div style="display:flex;gap:5px;align-items:center;">
        <div style="flex:1;display:flex;flex-direction:column;">
          <div>PRECIO NOCHE</div>
          {`Precio sugerido: $ ${selectedItem?.info?.defaultPrice}`}
          <input
            type="number"
            step={100}
            min={0}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div style="display:flex;flex:1;">
          <div style="display:flex;flex-direction:column;align-items:center;flex:1;">
            <div>{`${days} ${days == 1 ? 'NOCHE' : 'NOCHES'}`}</div>
            <div>
              {'TOTAL: $' +
                moment(range[1]).diff(moment(range[0]), 'days') * price}
            </div>
          </div>
          <div style="position:relative;">
            <button
              style="position:absolute;bottom:0;right:0;"
              class={disabled && 'disabled'}
              disabled={disabled}
              onClick={() => {
                const stay = {
                  ref: selectedItem._id,
                  info: selectedItem.info,
                  origin,
                  price,
                  range,
                  from,
                  to,
                };
                moment(range[0], 'YYYY-MM-DD').isBefore(
                  moment().startOf('day')
                ) && (stay.checkin = {});
                addElement('stay', user._id, stay);
              }}
            >
              AGREGAR
            </button>
          </div>
        </div>
      </div>
      {/* <div style="overflow:auto;"> */}
      {/*   {user.stay && */}
      {/*     [...user.stay].reverse().map((stay) => { */}
      {/*       return ( */}
      {/*         <AssetDisplay asset={stay} section={'stay'}> */}
      {/*           <StayInfo stay={stay} /> */}
      {/*         </AssetDisplay> */}
      {/*       ); */}
      {/*     })} */}
      {/* </div> */}
    </div>
  );
}
export function stayElem(stay, edit) {
  return <StayInfo stay={stay} />;
}
