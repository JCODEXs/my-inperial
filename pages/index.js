// {[...Array(26).keys()].map((i) => (
//   <>
//     {`/Recursos/Recurso ${i + 1}.png`}
//     <img style="max-width:80vw;" src={`/Recursos/Recurso ${i + 1}.png`} />
//   </>
// ))}
// import Landing from 'components/Landing';
import dynamic from "next/dynamic";
import gsap from "gsap";
// const Landing = dynamic(() => import('../components/Landing'), { ssr: false });
const Slider = dynamic(() => import("components/slider"), {
  ssr: false,
});
import { useState, useEffect } from "react";
export default function index() {
  const [overlay, setOverlay] = useState(false);
  // return <Landing /
  useEffect(() => {
    setTimeout(() => {
      gsap.to("#theContent", { duration: 0.6, opacity: 1 });
    }, 1000);
  }, []);
  return "imptech";
  return (
    false && (
      <div
        style="display:flex;flex-direction:column;height:100vh;max-height:100vh;overflow:hidden;
background:rgba(10,15,15);
	    "
      >
        <div style="z-index:3;padding:10px;max-height:60px;display:flex;gap:20px;align-items:center;color:silver;background:black;border-bottom:solid 4px rgb(80,80,80);padding:10px;">
          <img
            style="border-radius:50%;background:rgba(10,10,10,0.9);position:absolute;height:120px;max-height:140px;top:-20px;left:-20px;"
            src="https://imperialstudio.com.co/wp-content/uploads/2022/01/logoMenu.png"
          />
          <div style="flex:1;" />
          {/* <h1 style="flex:1;">IMPRERIAL</h1> */}
          <button onClick={() => setOverlay((prev) => !prev)}>MENU</button>
        </div>
        <div id="theContent" style="position:relative;flex:1;overflow:hidden;">
          {overlay && (
            <div class="menu" style="">
              <div>
                <div>INICIO</div>
              </div>
              <div>
                <div>NOSOTROS</div>
              </div>
              <div>
                <div>RECONOCIMIENTOS</div>
              </div>
              <div>
                <div>UNETE</div>
              </div>
              <div>
                <div>CONTACTO</div>
              </div>
            </div>
          )}
          <div style="max-height:100%;height:100%;position:relative;flex:1;overflow-y:scroll;">
            <Slider />
            <div
              style="background:rgba(10,15,15);height:500px;
		display:flex;align-items:center;
		justify-content:center;"
            >
              <div
                style="display:flex;
		  flex-direction:column;
		  align-items:center;
		  "
              >
                <h2> {`ATRÉVETE A MÁS`}</h2>
                <h2> {`JUNTOS LLEGAMOS LEJOS`}</h2>
                <h2> {`UNETE`}</h2>
              </div>
            </div>
            <div class="agenda" style="">
              <div style="position:absolute;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;">
                <div style="pointer-events:none;z-index:1;border:solid 4px rgba(160,160,160,0.8);border-radius:10px;background:rgba(10,10,10,0.6);padding:10px;">
                  <div
                    style="color:white;mix-blend-mode:exclusion;
			font-size:200%;font-weight:1000;
text-shadow: 0 0 20px white;
		      "
                  >
                    ¡AGENDA TU ENTREVISTA!
                  </div>
                </div>
              </div>
              <img style="width:100%;" src="/banner.png" />
            </div>
            <div
              style="height:400px;gap:20px;display:flex;flex-direction:column;
		  align-items:center;justify-content:center;
		  "
            >
              <h1> INSCRIBETE</h1>
              <div
                style="text-align:center;			font-size:250%;font-weight:1000;
		"
              >
                ¿QUIERES SER MODELO?
              </div>
              <div
                style="
text-align:center;			font-size:250%;font-weight:1000;
		      "
              >
                💕
              </div>
              <h2>¡Esta es tu oportunidad!</h2>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;max-width:800px;margin:auto;text-align:center;">
              <h1>IMPERIAL STUDIO</h1>
              <p>
                Somos una empresa ubicada en la ciudad de Cali que cuenta con 4
                años de experiencia formando modelos femeninas. Nuestro enfoque
                está dirigido a obtener un desarrollo personal y profesional
                íntegro, para eso contamos con un equipo de trabajo capacitado y
                dispuesto a brindarte las herramientas claves de apoyo
                necesarias para cumplir tus metas y sobre todo, tus sueños.
              </p>
              <div class="offerings" style="display:flex;flex-wrap:wrap;">
                <div>
                  <div>🎒</div> <div>Capacitación y Formación</div>
                </div>
                <div>
                  <div>🖥️</div>
                  Monitoreo 24/7
                </div>
                <div>
                  <div>📈</div>
                  <div> Tráfico y Posicionamiento</div>
                </div>
                <div>
                  <div>🔒</div>
                  Seguridad y Privacidad
                </div>
                <div>
                  <div>🏛️ </div>
                  Instalaciones de Alto Perfil
                </div>
                <div>
                  <div>💼</div>
                  Portafolio Profesional
                </div>
                <div>
                  <div>🗺️</div>
                  Viajes
                </div>
                <div>
                  <div>📅</div>
                  Horarios Flexibles
                </div>
                <div>
                  <div>💵</div>
                  Pagos Quincenales
                </div>
              </div>
              <h1>ÚNETE A NUESTRO EQUIPO</h1>
              <button>AGENDA UNA ENTREVISTA</button>
            </div>
            {/* <a */}
            {/*   href=" */}
            {/* https://partner-api.modelcenter.jasmin.com" */}
            {/* > */}
            {/*   TEST */}
            {/* </a> */}
          </div>
        </div>
        <div
          class="footer"
          style="font-weight:1000;display:flex;align-items:center;gap:20px;  border-top:solid 3px rgb(80,80,80);
	      "
        >
          <div style="display:flex;flex:1;gap:20px;align-items:center;">
            <img
              style="transform:scale(2) rotate(10deg);height:30px;"
              src="/footerCorona.png"
            />
            <div>SIGUENOS</div>
          </div>
          <div class="icons">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div style="flex:1;"></div>
        </div>
      </div>
    )
  );
}
export async function getServerSideProps() {
  return {
    props: { hello: "world" },
  };
}
