import { useState } from "react";
const promocion = [
  {
    tittle: "dos por uno",
    value: 5,
    miembros: 4,
  },
  {
    tittle: "HORAS EXTRA",
    value: 80,
    miembros: 4,
  },
  {
    tittle: "PUERTA SECRETA",
    value: 10,
    miembros: 4,
  },
  {
    tittle: "1 HORA FELIZ",
    value: false,
    miembros: 4,
  },
  {
    tittle: "2h EN TRASMISION EN VIVO",
    value: true,
    miembros: 4,
  },
  {
    tittle: "CUENTA NUEVA",
    value: true,
    miembros: 4,
  },
  {
    tittle: "SUBCRIPTORES AL FAN CLUB",
    value: 40,
    miembros: 4,
  },
  {
    tittle: "CUENTA NUEVA",
    value: true,
    miembros: 4,
  },
];

export default function TemplateFooter() {
  const [Apromo, setApromo] = useState({});
  const setMValue = (e) => {
    console.log("target value", e.target.value);
    const found = promocion.find((promo) => promo.tittle == e.target.value);
    if (found) {
      setApromo(found);
      console.log(JSON.stringify(e.target.value));
    } else {
      setApromo(null);
    }
  };

  return (
    <div style="max-height:100%;display:flex;flex-direction:column;flex-wrap:wrap;justify-content:space-around; padding: 1rem;">
      <div style="max-height:100%;display:flex;flex-direction:column; justify-content:center">
        SELECCIONAR UNA PROMOCION
        <input
          style="max-width:15rem;"
          onChange={setMValue}
          value={Apromo?.tittle}
          list="promo"
          placeholder="Type promo Name"
          type="text"
        >
          promo
        </input>
        <datalist id="promo" style={{ width: "100%" }}>
          {promocion.map((promo) => {
            return <option value={promo.tittle}>{` ${promo.tittle}`}</option>;
          })}
        </datalist>
        {Apromo && (
          <div style="max-height:100%;display:flex;flex-direction:column;flex-wrap:wrap;justify-content:space-evenly;">
            <div style="margin:.1rem;display:flex;border:1px solid silver;align-items:center;gap:5px;padding:5px;flex-direction:column">
              <div>{Apromo.tittle}</div>
              <div style=" display:flex;flex-direction:row;align-items:center">
                <div style="padding:1rem">SUBSCRIPTORES</div>
                <div>{Apromo.miembros}</div>
              </div>
              <div style="display:flex;flex-direction:row; align-items:center">
                <div style="padding:1rem">Estrellas</div>
                <div style="color: red;">
                  {Apromo.value === true
                    ? "***"
                    : !Apromo.value
                    ? "****"
                    : Apromo.value}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
