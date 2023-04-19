import ValidationInput from "components/validationInput";
import UserInfo from "./userInfo";
import { makeItAdmin } from "vStore/assets";
import { useEffect, useState } from "preact/hooks";
export default function MakeItAdmin({ user, onFinish }) {
  const [email, setEmail] = useState(user.info.email);
  const [pass, setPass] = useState();
  const [auth, setAuth] = useState(user.log?.auth);
  useEffect(() => {
    setEmail(user.info?.email ? user.info.email : "");
    setAuth(user.log?.auth ? user.log.auth : "null");
    setPass("");
  }, [user._id]);
  return (
    <div>
      <div style="padding:5px;border-bottom:solid 2px rgb(40,40,40)">
        <UserInfo user={user} />
      </div>
      <div style="padding:10px;">
        <div style="margin-bottom:5px;">
          <div style="margin-bottom:5px;">PRIVILEGIO</div>
          <select
            defaultValue={auth}
            onChange={(e) => {
              // alert(e.target.value);
              setAuth(e.target.value);
            }}
          >
            <option value="null">-----Seleccionar----</option>
            {user.info.email == "konopimi@hotmail.com" ||
              (user.info.email == "juansebastianescobar.vega@hotmail.com" && (
                <option value="dev">DEV</option>
              ))}
            <option value="admin">ADMIN</option>
            <option value="monitor">MONITOR</option>
            <option value="model">MODEL</option>
          </select>
        </div>
        <ValidationInput
          label="EMAIL"
          type="email"
          defaultValue={email}
          onChange={(e) => {
            e.target.value = e.target.value.toLowerCase();
            setEmail(e.target.value.toLowerCase());
          }}
        />
        <ValidationInput
          defaultValue={pass}
          label="NUEVA CONTRASEÑA"
          type="password"
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        {/* <ValidationInput */}
        {/*   label="VERIFICAR CONTRASEÑA" */}
        {/*   type="pass" */}
        {/*   onChange={() => {}} */}
        {/* /> */}
      </div>
      <div style="padding:10px;">
        <button
          disabled={!email || pass?.length < 6}
          class={(!email || pass?.length < 6) && "disabled"}
          onClick={() => {
            makeItAdmin(user._id, email, pass, auth);
            onFinish();
          }}
        >
          ADMIN
        </button>
      </div>
    </div>
  );
}
