export default function Periods() {
  return (
    <>
      {' '}
      {true && (
        <div
          style="
	      max-height:400px;
	      padding:20px;
	      background:black;
	    overflow-y:scroll;
	      display:flex;
	      flex-direction:column;
	      gap:10px;
	      "
        >
          <h2> TEST de periodos JASMIN</h2>
          {periods.map((period) => (
            <div
              class="period"
              style="   border:solid 2px rgb(60,60,60);
		  border-radius:10px;
		  padding:5px;
		  "
              onClick={() => {
                alert(`Filtranado por fecha de periodo jasmin
${period.period}
SE FILTRARA DESPUES DE ESTE TEST, SOLO UNA PRUEBA
		    `);
              }}
            >
              <div>
                {period.period} LUXEBURGO MUESTRA EL DIA SIGUIENTE PORQUE ES +2
              </div>
              <div> HORA ORIGINAL NEUTRAL</div>
              <div> START: {period.startDate}</div>
              {/* <div>inicio hace: {moment(period.startDate).fromNow()}</div> */}
              <div> END: {period.endDate}</div>
              {/* <div>finaliza: {moment(period.endDate).fromNow()}</div> */}
              <br />
              <div> HORA ORIGINAL DE COLOMBIA</div>
              {/* <div> INICIO: {moment(period.startDate).local()}</div> */}
              {/* <div> FIN: {moment(period.endDate).local()}</div> */}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
