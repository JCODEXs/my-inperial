import { sideSections } from "vStore/sections";
import { useSelected, setToggle } from "vStore/selected";
import { useUi } from "vStore/ui";
import { useLogin } from "vStore/login";
export default function SideSection() {
  const { toggle } = useSelected();
  const { chart } = useUi();
  const { user } = useLogin();
  return (
    <div
      id="chart_cont"
      style={{
        overflow: "hidden",
        position: "relative",
        height: "0px",
        minWidth: "100%",
        maxWidth: "100%",
      }}
    >
      {/* <div id="pie"></div> */}
      {/* <Pie /> */}
      {user.log.auth == "admin" &&
        chart &&
        sideSections.find((sect) => sect.name == toggle)?.elem}
      {true && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            top: 0,
            left: 0,
            height: "100%",
            position: "absolute",
          }}
        >
          <p>{"Nada para ver"}</p>
          <button
            class="btn"
            onClick={
              () => {}
              //	clearSearch
            }
          >
            Limpiar Busqueda
          </button>
        </div>
      )}
    </div>
  );
}
